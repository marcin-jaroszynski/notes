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
import { clearDb } from './Helper.js';

chai.use(chaiAsPromised);

dbConnect();

describe(label('DB: Category'), () => {
  let addCategory = async (title) => {
    let category = HelperUnit.getCategory(title);
    let categoryToAdd = new CategorySchema({ title: category.getTitle(), code: category.getCode() });
    await categoryToAdd.save();
    return category;
  };

  let addNote = async (title, category, tags) => {
    let note = HelperUnit.getNote(title, tags); 
    note.setCategoryId(category.getCode());
    let noteId = await CategorySchema.addNote(note);
    note.setId(noteId);
    return note;
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
    try {
      let categoryFoo = await addCategory('Foo');
      let categoryBar = HelperUnit.getCategory('Bar');
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
      let categoryFoo = await addCategory('Foo');
      let categoryBar = await addCategory('Bar');
      return expect(CategorySchema.changeTitle(categoryBar, categoryFoo)).is.rejected;
    } catch(error) {
      console.log(error);
    }
  });

  describe(label('Tags'), () => { 
    it(label('Add tags to category'), async () => {
      try {
        let categoryFoo = await addCategory('Foo');
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
        let categoryFoo = await addCategory('Foo');
        let addedNote = await addNote('Note 1', categoryFoo, ['Tag 1', 'Tag 2']);
        let categoryFromDb = await CategorySchema.category(categoryFoo.getCode());      
        let noteFromDb = await NoteSchema.notes(addedNote.getCategoryId());
        expect(addedNote.tags.get().length).to.equal(categoryFromDb.tags.length);
      } catch(error) {
        console.log(error);
      }
    });
    
    it(label('Add two notes with tags to category'), async () => {
      try {
        let categoryFoo = await addCategory('Foo');
        let addedNote1 = await addNote('Note 1', categoryFoo, ['Tag 1', 'Tag 2']);
        let addedNote2 = await addNote('Note 2', categoryFoo, ['Tag 3', 'Tag 4']);
        let categoryFromDb = await CategorySchema.category(categoryFoo.getCode());
        expect(4).to.equal(categoryFromDb.tags.length);
      } catch(error) {
        console.log(error);
      }
    });

    it(label('Add two notes with tag that repeats in each note - should increment counter of that tag'), async () => {
      try {
        let categoryFoo = await addCategory('Foo');
        let addedNote1 = await addNote('Note 1', categoryFoo, ['Tag 1', 'Tag 2']);
        let addedNote2 = await addNote('Note 2', categoryFoo, ['Tag 2', 'Tag 3']);
        let categoryFromDb = await CategorySchema.category(categoryFoo.getCode());
        expect(3).to.equal(categoryFromDb.tags.length);
      } catch(error) {
        console.log(error);
      }
    });

    it(label('After update note should add new tags'), async () => {
      try {
        let categoryFoo = await addCategory('Foo');
        let addedNote = await addNote('Note 1', categoryFoo, ['Tag 1', 'Tag 2']);
        addedNote.tags.add('Tag 3');
        addedNote.tags.add('Tag 4');
        await CategorySchema.updateNote(addedNote);
        let categoryAfterUpdateNote = await CategorySchema.category(addedNote.getCategoryId());
        expect(4).to.equal(categoryAfterUpdateNote.tags.length);
      } catch(error) {
        console.log(error);
      }
    });

    it(label('Decrement counter tag after remove it from category'), async () => {
      try {
        let categoryFoo = await addCategory('Foo');
        let repeatedTag = HelperUnit.getTag('Tag 2');
        let addedNote1 = await addNote('Note 1', categoryFoo, ['Tag 1', repeatedTag.getTitle()]);
        let addedNote2 = await addNote('Note 2', categoryFoo, [repeatedTag.getTitle(), 'Tag 3']);
        let category = await CategorySchema.category(categoryFoo.getCode());
        let categoryTagsMap = createCategoryTagsMap(category.tags);
        expect(2).to.equal(categoryTagsMap.get(repeatedTag.getCode()).counter);
        addedNote2.tags.remove(repeatedTag.getTitle());
        await CategorySchema.updateNote(addedNote2);
        category = await CategorySchema.category(categoryFoo.getCode());
        categoryTagsMap = createCategoryTagsMap(category.tags);
        expect(1).to.equal(categoryTagsMap.get(repeatedTag.getCode()).counter);
      } catch(error) {
        console.log(error);
      }
    });

    it(label('After decrement counter tag from category to zero, this tag should be removed'), async () => {
      try {
        let categoryFoo = await addCategory('Foo');
        let tag = HelperUnit.getTag('Tag 2');
        let addedNote = await addNote('Note 1', categoryFoo, ['Tag 1', tag.getTitle()]);
        addedNote.tags.remove(tag.getTitle());
        await CategorySchema.updateNote(addedNote);
        let category = await CategorySchema.category(categoryFoo.getCode());
        expect(1).to.equal(category.tags.length);
      } catch(error) {
        console.log(error);
      }
    });
  });

  it(label('Update note - change category to another'), async () => {
    try {
      let categoryFoo = await addCategory('Foo');
      let addedNote = await addNote('Note 1', categoryFoo, ['Tag 1', 'Tag 2']);
      let categoryBar = await addCategory('Bar');
      addedNote.setCategoryId(categoryBar.getCode());
      await CategorySchema.updateNote(addedNote);
      let notesCategoryFoo = await NoteSchema.notes(categoryFoo.getCode());
      expect(0).to.equal(notesCategoryFoo.length, 'Amount notes for category Foo');
      let categoryFooFromDb = await CategorySchema.category(categoryFoo.getCode());
      expect(0).to.equal(categoryFooFromDb.tags.length, 'Number tags from Foo category');
      let notesCategoryBar = await NoteSchema.notes(categoryBar.getCode());
      expect(1).to.equal(notesCategoryBar.length, 'Amount notes for category Bar');
      let categoryBarFromDb = await CategorySchema.category(categoryBar.getCode());
      expect(2).to.equal(categoryBarFromDb.tags.length, 'Number tags from Bar category');
    } catch(error) {
      console.log(error);
    }
  });

  it(label('Change category title should update category-code for all notes assigned to it category'), async () => {
    try {
      let categoryFoo = await addCategory('Foo');
      let addedNote1 = await addNote('Note 1', categoryFoo, ['Tag 1', 'Tag 2']);
      let addedNote2 = await addNote('Note 2', categoryFoo, ['Tag 3', 'Tag 4']);
      let notesCategoryFoo = await NoteSchema.notes(categoryFoo.getCode());
      expect(2).to.equal(notesCategoryFoo.length); 
      let categoryBar = HelperUnit.getCategory('Bar');
      await CategorySchema.changeTitle(categoryFoo, categoryBar);
      let notesCategoryFooAfterChangeTitle = await NoteSchema.notes(categoryFoo.getCode());
      expect(0).to.equal(notesCategoryFooAfterChangeTitle.length, 'Amount category Foo notes');
      let notesCategoryBar = await NoteSchema.notes(categoryBar.getCode());
      expect(2).to.equal(notesCategoryBar.length, 'Amount category Bar notes');
    } catch(error) {
      console.log(error);
    }
  });

  it(label('Remove note'), async () => {
    try {
      let categoryFoo = await addCategory('Foo');
      let tagX = HelperUnit.getTag('Tag X');
      let tagY = HelperUnit.getTag('Tag Y');
      let note1 = await addNote('Note 1', categoryFoo, ['Tag 1', tagX.getTitle()]);
      let note2 = await addNote('Note 2', categoryFoo, [tagX.getTitle(), tagY.getTitle()]);
      await CategorySchema.removeNote(note2.getId());
      let notesCategoryFoo = await NoteSchema.notes(categoryFoo.getCode());
      expect(1).to.equal(notesCategoryFoo.length, 'Amount of notes after remove note');
      let category = await CategorySchema.category(categoryFoo.getCode());
      let categoryTagsMap = createCategoryTagsMap(category.tags);
      expect(1).to.equal(categoryTagsMap.get(tagX.getCode()).counter, 'Counter Tag X');
      expect(undefined).to.equal(categoryTagsMap.get(tagY.getCode()), 'Counter Tag Y');
    } catch(error) {
      console.log(error);
    }
  });

});