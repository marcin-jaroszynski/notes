process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
const config = require('config');
import CategorySchema from '../../../server/db/models/category';
import NoteSchema from '../../../server/db/models/note';
import HelperUnit from '../../unit/specs/Model/Helper';
import { label, errorLog } from '../../../server/util/colors';
import chai from 'chai'; 
const expect = chai.expect;
import chaiAsPromised from 'chai-as-promised';
import dbConnect from '../../../server/db.js';
import clearDb from './Helper.js';

chai.use(chaiAsPromised);

dbConnect();

describe(label('DB: Category'), () => {
  let addCategory = (title) => {
    let category = HelperUnit.getCategory(title);
    let categoryToAdd = new CategorySchema({ title: category.getTitle(), code: category.getCode() });
    return categoryToAdd.save();
  };

  let createCategoryTagsMap = (categoryTags) => {
    let categoryTagsMap = new Map();
    for (let i = 0; i < categoryTags.length; i++) {
      categoryTagsMap.set(categoryTags[i].code, categoryTags[i]);
    }
    return categoryTagsMap;
  };

  beforeEach(async () => {
    await clearDb();
  });

  it(label('It should throw exception when is try to add same category that is already exist'), async () => {
    try {
      await addCategory('Foo');
      return expect(addCategory('Foo')).is.rejected;
    } catch(error) {
      console.log(error);
    }
  });

  it(label('It should change title for existing category'), async () => {
    let categoryFoo = HelperUnit.getCategory('Foo');
    let categoryBar = HelperUnit.getCategory('Bar');
    try {
      await addCategory(categoryFoo.getTitle());
      await CategorySchema.changeTitle(categoryFoo, categoryBar);
      const recordFromDb = await CategorySchema.findOne({ code: categoryBar.getCode() });
      expect(categoryBar.getTitle()).to.equal(recordFromDb.title);
      expect(categoryBar.getCode()).to.equal(recordFromDb.code);
    } catch(error) {
      console.log(error);
    }
  });

  it(label('It should throw exception when is try to change title for category, but another category is exist with that title'),  async () => {
    try {
      let categoryFoo = HelperUnit.getCategory('Foo');;
      let categoryBar = HelperUnit.getCategory('Bar');
      await addCategory(categoryFoo.getTitle());
      await addCategory(categoryBar.getTitle());
      return expect(CategorySchema.changeTitle(categoryBar, categoryFoo)).is.rejected;
    } catch(error) {
      console.log(error);
    }
  });

  describe(label('Tags'), () => { 
    it(label('Add tags to category'), async () => {
      try {
        let categoryFoo = HelperUnit.getCategory('Foo');
        await addCategory(categoryFoo.getTitle());
        let tagsToAdd = HelperUnit.getTagList(['Tag 1', 'Tag 2']);
        await CategorySchema.addTags(categoryFoo.getCode(), tagsToAdd);
        let categoryAfterAddTags = await CategorySchema.category(categoryFoo.getCode());
        expect(2).to.equal(categoryAfterAddTags.tags.length);
      } catch(error) {
        console.log(error);
      }
    });

    it(label('After add note to specific category, it should has tags from that note'), async () => {
      try {
        let categoryFoo = HelperUnit.getCategory('Foo');
        await addCategory(categoryFoo.getTitle());
        let noteToAdd = HelperUnit.getNote('Note 1', ['Tag 1', 'Tag 2']); 
        noteToAdd.setCategoryId(categoryFoo.getCode());
        await CategorySchema.addNote(noteToAdd);
        let categoryFromDb = await CategorySchema.category(categoryFoo.getCode());      
        let noteFromDb = await NoteSchema.notes(noteToAdd.getCategoryId());
        expect(noteToAdd.tags.get().length).to.equal(categoryFromDb.tags.length);
      } catch(error) {
        console.log(error);
      }
    });
    
    it(label('Add two notes with tags to category'), async () => {
      try {
        let categoryFoo = HelperUnit.getCategory('Foo');
        await addCategory(categoryFoo.getTitle());
        let noteToAdd1 = HelperUnit.getNote('Note 1', ['Tag 1', 'Tag 2']); 
        noteToAdd1.setCategoryId(categoryFoo.getCode());
        await CategorySchema.addNote(noteToAdd1);
        let noteToAdd2 = HelperUnit.getNote('Note 2', ['Tag 3', 'Tag 4']); 
        noteToAdd2.setCategoryId(categoryFoo.getCode());
        await CategorySchema.addNote(noteToAdd2);
        let categoryFromDb = await CategorySchema.category(categoryFoo.getCode());
        expect(4).to.equal(categoryFromDb.tags.length);
      } catch(error) {
        console.log(error);
      }
    });

    it(label('Add two notes with tag that repeats in each note - should increment counter of that tag'), async () => {
      try {
        let categoryFoo = HelperUnit.getCategory('Foo');
        await addCategory(categoryFoo.getTitle());
        let noteToAdd1 = HelperUnit.getNote('Note 1', ['Tag 1', 'Tag 2']); 
        noteToAdd1.setCategoryId(categoryFoo.getCode());
        await CategorySchema.addNote(noteToAdd1);
        let noteToAdd2 = HelperUnit.getNote('Note 2', ['Tag 2', 'Tag 3']); 
        noteToAdd2.setCategoryId(categoryFoo.getCode());
        await CategorySchema.addNote(noteToAdd2);
        let categoryFromDb = await CategorySchema.category(categoryFoo.getCode());
        expect(3).to.equal(categoryFromDb.tags.length);
      } catch(error) {
        console.log(error);
      }
    });

    it(label('After update note should add new tags'), async () => {
      try {
        let categoryFoo = HelperUnit.getCategory('Foo');
        await addCategory(categoryFoo.getTitle());
        let note = HelperUnit.getNote('Note 1', ['Tag 1', 'Tag 2']); 
        note.setCategoryId(categoryFoo.getCode());
        let addedNoteId = await CategorySchema.addNote(note);
        note.setId(addedNoteId);
        note.tags.add('Tag 3');
        note.tags.add('Tag 4');
        await CategorySchema.updateNote(note);
        let categoryAfterUpdateNote = await CategorySchema.category(note.getCategoryId());
        expect(4).to.equal(categoryAfterUpdateNote.tags.length);
      } catch(error) {
        console.log(error);
      }
    });

    it(label('Decrement counter tag after remove it from category'), async () => {
      try {
        let categoryFoo = HelperUnit.getCategory('Foo');
        await addCategory(categoryFoo.getTitle());
        let repeatedTag = HelperUnit.getTag('Tag 2');
        let note1 = HelperUnit.getNote('Note 1', ['Tag 1', repeatedTag.getTitle()]); 
        note1.setCategoryId(categoryFoo.getCode());
        let note1Id = await CategorySchema.addNote(note1);
        note1.setId(note1Id);
        let note2 = HelperUnit.getNote('Note 2', [repeatedTag.getTitle(), 'Tag 3']); 
        note2.setCategoryId(categoryFoo.getCode());
        let note2Id = await CategorySchema.addNote(note2);
        note2.setId(note2Id);
        let category = await CategorySchema.category(categoryFoo.getCode());
        let categoryTagsMap = createCategoryTagsMap(category.tags);
        expect(2).to.equal(categoryTagsMap.get(repeatedTag.getCode()).counter);
        note2.tags.remove(repeatedTag.getTitle());
        await CategorySchema.updateNote(note2);
        category = await CategorySchema.category(categoryFoo.getCode());
        categoryTagsMap = createCategoryTagsMap(category.tags);
        expect(1).to.equal(categoryTagsMap.get(repeatedTag.getCode()).counter);
      } catch(error) {
        console.log(error);
      }
    });

    it(label('After decrement counter tag from category to zero, this tag should be removed'), async () => {
      try {
        let categoryFoo = HelperUnit.getCategory('Foo');
        await addCategory(categoryFoo.getTitle());
        let tag = HelperUnit.getTag('Tag 2');
        let note = HelperUnit.getNote('Note 1', ['Tag 1', tag.getTitle()]); 
        note.setCategoryId(categoryFoo.getCode());
        let noteId = await CategorySchema.addNote(note);
        note.setId(noteId);
        note.tags.remove(tag.getTitle());
        await CategorySchema.updateNote(note);
        let category = await CategorySchema.category(categoryFoo.getCode());
        expect(1).to.equal(category.tags.length);
      } catch(error) {
        console.log(error);
      }
    });
  });

});