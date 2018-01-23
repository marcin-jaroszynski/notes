import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import tagSchema from './tagNote';
import TagList from '../../../src/model/tag/list';

const noteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true, index: true },
  tags: [tagSchema],
  created_date: { type: Date, default: Date.now() }
});

noteSchema.static('notes', function(categoryCode) {
  return this.find({category: categoryCode});
});

noteSchema.static('getTags', async function(noteId) {
  try {
    let note = await this.findOne({_id: noteId}, { tags: 1 });
    return note.tags;
  } catch(error) {
    console.log(error);
  }
});

noteSchema.static('add', async function(note) {
  try {   
    let noteToAdd = new this;
    noteToAdd.title = note.getTitle();
    noteToAdd.content = note.getContent();
    noteToAdd.category = note.getCategoryId();
    noteToAdd.tags = note.tags.get();
    let addedNote = await noteToAdd.save();
    return addedNote._id;
  } catch(error) {
    console.log(error);
  }
});

noteSchema.static('edit', async function(note) {
   try { 
    let currentNote = await this.findOne({_id: note.getId()});
    
    let editedNoteTags = note.tags.get();
    let currentNoteTagList = new TagList();
    currentNoteTagList.set(currentNote.tags);
    let comparedTags = currentNoteTagList.compare(note.tags);
    // console.log('Note.edit.comparedTags: ' + JSON.stringify(comparedTags));

    currentNote.title = note.getTitle();
    currentNote.content = note.getContent();
    currentNote.category = note.getCategoryId();
    currentNote.tags = note.tags.get();
    
    await currentNote.save();
    return comparedTags;
  } catch(error) {
    console.log(error);
  }
});

export default mongoose.model('note', noteSchema);