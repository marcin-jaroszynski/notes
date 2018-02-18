import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import tagSchema from './tag';
import noteSchema from './note';
import CategoryTags from './tags.js';
import TagList from '../../../src/model/tag/list';
import NoteModel from '../../../src/model/note/note';
import Url from '../../../src/model/url.js';

const categorySchema = new Schema({
  title: { type: String, required: true },
  code: { type: String, index: true, unique: true },
  tags: [tagSchema],
  created_date: { type: Date, default: () => { return Date.now() } }
});

categorySchema.static('categories', async function() {
  let categories = await this.find({});
  if (Object.keys(categories).length === 0) {
    return [];
  }
  return categories;
});

categorySchema.static('category', function(categoryCode) {
  return this.findOne({code: categoryCode});
});

categorySchema.static('changeTitle', async function(currentCategory, updatedCategory) {
  let conditions = { code: currentCategory.getCode() };
  let update = { $set: { title: updatedCategory.getTitle(), code: updatedCategory.getCode() } };
  await this.update(conditions, update);
  return await noteSchema.changeCategory(currentCategory.getCode(), updatedCategory.getCode());
});

categorySchema.static('getTags', async function(categoryCode) {
  let tags = [];
  let category = await this.findOne({code: categoryCode}, {tags: 1});
  if (category) {
    tags = category.tags;
  }
  return tags;
});

categorySchema.static('addTags', async function(categoryCode, tagList) {
  try {
    let categoryTags = new CategoryTags(await this.getTags(categoryCode));
    categoryTags.add(tagList.get());
    let tagsToSet = categoryTags.get();
    let conditions = { code: categoryCode };
    let update = { $set: { tags: tagsToSet } };
    return await this.update(conditions, update);
  } catch(error) {
    console.log(error);
  }
});

categorySchema.static('editTags', async function(categoryCode, tagsToUpdate) {
  let categoryTags = new CategoryTags(await this.getTags(categoryCode));
  categoryTags.add(tagsToUpdate.toAdd.data);
  categoryTags.reduce(tagsToUpdate.toRemove.data);
  let tagsToSet = categoryTags.get();
  let conditions = { code: categoryCode };
  let update = { $set: { tags: tagsToSet } };
  return await this.update(conditions, update);
});

categorySchema.static('removeTags', async function(categoryCode, tagsToRemove) {
  let categoryTags = new CategoryTags(await this.getTags(categoryCode));
  categoryTags.reduce(tagsToRemove);
  let tagsToSet = categoryTags.get();
  let conditions = { code: categoryCode };
  let update = { $set: { tags: tagsToSet } };
  return await this.update(conditions, update);
});

categorySchema.static('addNote', async function(note) {
  let addedNote = await noteSchema.add(note);
  await this.addTags(note.getCategoryId(), note.tags);
  let recordAfterUpdate = await this.findOne({code: note.getCategoryId()}, {tags: 1});
  return addedNote;
});

categorySchema.static('updateNote', async function(editedNote) {
  try { 
    let currentNote = await noteSchema.note(editedNote.getId());
    if (currentNote) {
      if (currentNote.category === editedNote.getCategoryId()) {
        let tagsToUpdate = await noteSchema.edit(editedNote);
        return await this.editTags(editedNote.getCategoryId(), tagsToUpdate);
      } else {
        await this.removeTags(currentNote.category, currentNote.tags);
        await noteSchema.edit(editedNote);
        return await this.addTags(editedNote.getCategoryId(), editedNote.tags);
      }
    }
  } catch(error) {
    console.log(error);
  }
});

categorySchema.static('removeNote', async function(noteId) {
  try {
    let noteToRemove = await noteSchema.note(noteId);
    if (noteToRemove) {
      await noteSchema.remove({_id: noteId});
      await this.removeTags(noteToRemove.category, noteToRemove.tags);
    }
  } catch(error) {
    console.log(error);
  }
});

categorySchema.static('getNotesList', async function(categoryCode) {
  let notesList = await noteSchema.getLatestEntries(categoryCode);
  let returnData = [];
  for (let i = 0; i < notesList.length; i++) {
    let note = new NoteModel();
    note.setId(notesList[i]._id);
    note.setTitle(notesList[i].title);
    note.setDateAdded(notesList[i].created_date);
    returnData.push(note);
  }
  return returnData;
});

export default mongoose.model('category', categorySchema);