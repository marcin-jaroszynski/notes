import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import tagSchema from './tag';
import noteSchema from './note';
import TagList from '../../../src/model/tag/list';

const categorySchema = new Schema({
  title: { type: String, required: true },
  code: { type: String, index: true, unique: true },
  tags: [tagSchema],
  created_date: { type: Date, default: Date.now() }
});

categorySchema.static('categories', function() {
  return this.find({});
});

categorySchema.static('category', function(categoryCode) {
  return this.findOne({code: categoryCode});
});

categorySchema.static('changeTitle', function(currentCategory, updatedCategory) {
  let conditions = { code: currentCategory.getCode() };
  let update = { $set: { title: updatedCategory.getTitle(), code: updatedCategory.getCode() } };
  return this.update(conditions, update);
});

categorySchema.static('addTags', async function(categoryCode, tagList) {
  try {
    let category = await this.findOne({code: categoryCode}, {tags: 1});
    let tagsCategoryMap = new Map();
    for (let i = 0; i < category.tags.length; i++) {
      tagsCategoryMap.set(category.tags[i].code, category.tags[i]);
    }
    let tagsToAdd = [];
    let tags = tagList.get();
    let categoryTagsSchema = mongoose.model('categoryTagSchema', tagSchema);
    for (let i = 0; i < tags.length; i++) {
      if (tagsCategoryMap.has(tags[i].code)) {
        let currentTag = tagsCategoryMap.get(tags[i].code);
        currentTag.counter++;
        tagsCategoryMap.set(currentTag.code, currentTag);
      } else {
        tagsCategoryMap.set(tags[i].code, new categoryTagsSchema({title: tags[i].title, code: tags[i].code}));        
      }
    }
    tagsToAdd = Array.from(tagsCategoryMap.values());
    let conditions = { code: categoryCode };
    let update = { $set: { tags: tagsToAdd } };
    return await this.update(conditions, update);
  } catch(error) {
    console.log(error);
  }
});

categorySchema.static('editTags', async function(categoryCode, tagsToUpdate) {
  try {
    let category = await this.findOne({code: categoryCode}, { tags: 1 });
    let tagsCategoryMap = new Map();
    for (let i = 0; i < category.tags.length; i++) {
      tagsCategoryMap.set(category.tags[i].code, category.tags[i]);
    }
    let tagsToAdd = tagsToUpdate.toAdd.data;
    let categoryTagsSchema = mongoose.model('categoryTagSchema', tagSchema);
    for (let i = 0; i < tagsToAdd.length; i++) {
      if (tagsCategoryMap.has(tagsToAdd[i].code)) {
        let currentTag = tagsCategoryMap.get(tagsToAdd[i].code);
        currentTag.counter++;
        tagsCategoryMap.set(currentTag.code, currentTag);
      } else {
        tagsCategoryMap.set(tagsToAdd[i].code, new categoryTagsSchema({title: tagsToAdd[i].title, code: tagsToAdd[i].code}));
      }
    }
    let tagsToRemove = tagsToUpdate.toRemove.data;
    for (let i = 0; i < tagsToRemove.length; i++) {
      if (tagsCategoryMap.has(tagsToRemove[i].code)) {
        let currentTag = tagsCategoryMap.get(tagsToRemove[i].code);
        currentTag.counter--;
        if (currentTag.counter === 0) {
          tagsCategoryMap.delete(currentTag.code);
        }
        tagsCategoryMap.set(currentTag.code, currentTag);
      }
    }
    let tagsToSet = Array.from(tagsCategoryMap.values());
    console.log('Category.editTags.tagsToSet: '+ JSON.stringify(tagsToSet));
    let conditions = { code: categoryCode };
    let update = { $set: { tags: tagsToSet } };
    return await this.update(conditions, update);
  } catch(error) {
    console.log(error);
  }
});

categorySchema.static('addNote', async function(note) {
  try {
    let addedNoteId = await noteSchema.add(note);
    await this.addTags(note.getCategoryId(), note.tags);
    let recordAfterUpdate = await this.findOne({code: note.getCategoryId()}, {tags: 1});
    return addedNoteId;
  } catch(error) {
    console.log(error);
  }
});

categorySchema.static('updateNote', async function(note) {
  try {
    let tagsToUpdate = await noteSchema.edit(note);
    await this.editTags(note.getCategoryId(), tagsToUpdate);
    return;
  } catch(error) {
    console.log(error);
  }
});

export default mongoose.model('category', categorySchema);