import Category from './category.js'
import CategoryList from './list.js'
import Note from '../note/note.js'

export default class CategoryStorage {
  constructor() {
    this.list = new CategoryList();
    this.list.add('CSS');
    this.list.add('JavaScript');
    this.list.add('HTML 5');
    this.list.add('PHP');
    this.list.add('MySQL');

    this.freeNoteId = 1;
  }

  getList() {
    return this.list.get();
  }

  getTitleFor(categoryCode) {
    return this.list.getTitleFor(categoryCode);
  }

  getFor(categoryCode) {
    return this.list.findByCode(categoryCode);
  }

  add(title) {
    let categoryToAdd = new Category(title);
    let result = this.list.checkIsExist(title);
    if (result.getTitle()) {
      return false;
    }
    this.list.add(title); 
    return true;
  }

  changeTitle(currentCategoryTitle, newCategoryTitle) {
    return this.list.changeTitle(currentCategoryTitle, newCategoryTitle);
  }

  addNoteFor(categoryCode, note) {
    note.setId(this.freeNoteId);
    this.freeNoteId++;
    return this.list.addNoteFor(categoryCode, note);
  }

  editNoteFor(categoryCode, note) {
    return this.list.editNoteFor(categoryCode, note);
  }

  getNotesFor(categoryCode) {
    let categoryToFind = this.list.findByCode(categoryCode);
    return categoryToFind.getNotes();
  }

  getTagsFor(categoryCode) {
    let categoryToFind = this.list.findByCode(categoryCode);
    return categoryToFind.getTags();
  }

  getNoteFor(noteId) {
    let categories = this.list.get();
    for (let i = 0; i < categories.length; i++) {
      let notes = categories[i].getNotes();
      for (let j = 0; j < notes.length; j++) {
        if (notes[j].getId() == noteId) {
          return notes[j];
        }
      }
    }
    return new Note();
  }

  editCategoryNote(noteEdit, tagsToAdd, tagsToRemove) {
    let resultEdit = this.editNoteFor(noteEdit.getCategoryId(), noteEdit);
    if (resultEdit) {
      let categoryNote = this.getFor(noteEdit.getCategoryId());
      if (categoryNote.getCode()) {
        categoryNote.removeTags(tagsToRemove.get());
        categoryNote.addTags(tagsToAdd.get());
        return true;
      }
    }
    return false;
  }
} 