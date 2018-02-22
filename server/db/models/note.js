import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import tagSchema from './tagNote';
import TagList from '../../../src/model/tag/list';

const noteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true, index: true },
  tags: [tagSchema],
  created_date: { type: Date, default: () => { return Date.now(); } }
});

noteSchema.static('notes', function(categoryCode) {
  return this.find({category: categoryCode});
});

noteSchema.static('note',  function(noteId) {
  return this.findOne({_id: noteId});
});

noteSchema.static('numOfNotes', function() {
  return this.find({}).count();
});

noteSchema.static('getLatestEntries',  function(categoryCode) {
  return this.find({category: categoryCode}, {title: 1, created_date: 1}).sort({ created_date: -1 });
});

noteSchema.static('getDashboardEntries', function(page, limit) {
  let skip = limit * (page - 1);
  return this.find({}, {title: 1, category: 1, created_date: 1}).sort({ created_date: -1 }).skip(skip).limit(limit);
});

noteSchema.static('getTags', async function(noteId) {
  let note = await this.findOne({_id: noteId}, { tags: 1 });
  return note.tags;
});

noteSchema.static('getByTag', function(tagCode) {
  return this.find({'tags.code': tagCode}, {title: 1, category: 1, created_date: 1}).sort({ created_date: -1 });
});

noteSchema.static('add', async function(note) {
  let noteToAdd = new this;
  noteToAdd.title = note.getTitle();
  noteToAdd.content = note.getContent();
  noteToAdd.category = note.getCategoryId();
  noteToAdd.tags = note.tags.get();
  let addedNote = await noteToAdd.save();
  return addedNote;
});

noteSchema.static('edit', async function(note) {
  let currentNote = await this.findOne({_id: note.getId()});
  if (currentNote) {
    let editedNoteTags = note.tags.get();
    let currentNoteTagList = new TagList();
    currentNoteTagList.set(currentNote.tags);
    let comparedTags = currentNoteTagList.compare(note.tags);

    currentNote.title = note.getTitle();
    currentNote.content = note.getContent();
    currentNote.category = note.getCategoryId();
    currentNote.tags = note.tags.get();
    
    await currentNote.save();
    return comparedTags;
  }
});

noteSchema.static('changeCategory', async function(currentCategoryCode, newCategoryCode) {
  return await this.update({category: currentCategoryCode}, { $set: { category: newCategoryCode } }, { multi: true });
});

export default mongoose.model('note', noteSchema);