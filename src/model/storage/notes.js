import Note from '../note/note.js'
import NoteList from '../note/list.js'

export default class Notes {
  constructor(categories) {
    this.categories = categories;
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
    let category = this.categories.get(note.getCategoryId());
    return category.addNote(note);
  }

  set(note) {
    let category = this.categories.get(note.getCategoryId());
    return category.setNote(note);
  }

  remove(noteId) {
    let noteToRemove = this.get(noteId);
    let category = this.categories.get(noteToRemove.getCategoryId());
    return category.removeNote(noteId);
  }

  edit(editedNote) {
    let currentNote = this.get(editedNote.getId());
    let isSameCategory = (currentNote.getCategoryId() === editedNote.getCategoryId());
    if (isSameCategory) {
        return this._updateNote(editedNote);
    } 
    return this._changeCategory(editedNote, currentNote);
  }

  _updateNote(editedNote) {
    let categoryEditedNote = this.categories.get(editedNote.getCategoryId());
    return categoryEditedNote.editNote(editedNote);
  }

  _changeCategory(editedNote, currentNote) {
    let categoryEditedNote = this.categories.get(editedNote.getCategoryId());
    if (categoryEditedNote.getTitle()) {
      let currentCategoryNote = this.categories.get(currentNote.getCategoryId());
      let isNoteRemoved = currentCategoryNote.removeNote(currentNote.getId());
      if (isNoteRemoved) {
        return categoryEditedNote.addNote(editedNote);
      }
    }
    return false;
  }
}