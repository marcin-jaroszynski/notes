import Note from '../note/note.js'
import NoteList from '../note/list.js'

export default class Notes {
  constructor(categories, dashboard) {
    this.categories = categories;
    this.dashboard = dashboard;
    this.freeNoteId = 1;
  }

  get(noteId) {
    let categories = this.categories.getAll();
    for (let i = 0; i < categories.length; i++) {
      let notes = categories[i].notes.getAll();
      for (let j = 0; j < notes.length; j++) {
        if (notes[j].getId() == noteId) {
          return notes[j];
        }
      }
    }
    return new Note();
  }

  add(note) {
    if (note.getId() === 0) {
      note.setId(this.freeNoteId);
      this.freeNoteId++;
    }
    let category = this.categories.get(note.getCategoryId());
    if (category.addNote(note)) {
      this.dashboard.add(note, category);
      return true;
    }
    return false;
  }

  remove(noteId) {
    let noteToRemove = this.get(noteId);
    let category = this.categories.get(noteToRemove.getCategoryId());
    if (category.removeNote(noteId)) {
      this.dashboard.remove(noteId);
      return true;
    }
    return false;
  }

  edit(noteEdit, tagsToAdd, tagsToRemove) {
    let currentNote = this.get(noteEdit.getId());
    let categoryEditedNote = this.categories.get(noteEdit.getCategoryId());
    if (currentNote.getCategoryId() === noteEdit.getCategoryId()) {
      if (categoryEditedNote.editNote(noteEdit, tagsToAdd, tagsToRemove)) {
        this.dashboard.updateEntry(noteEdit, categoryEditedNote);
        return true;
      }
    } else {
      if (categoryEditedNote.getTitle()) {
        return this._changeCategory(noteEdit, currentNote);
      }
    }
    return false; 
  }

  _changeCategory(noteEdit, currentNote) {
    let currentCategoryNote = this.categories.get(currentNote.getCategoryId());
    let resultRemoveNote = currentCategoryNote.removeNote(currentNote.getId());
    if (resultRemoveNote) {
      let newCategory = this.categories.get(noteEdit.getCategoryId());
      if (newCategory.addNote(noteEdit)) {
        this.dashboard.updateEntry(noteEdit, newCategory);
        return true;
      }
    }
    return false;
  }
}