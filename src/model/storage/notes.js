import Note from '../note/note.js'
import NoteList from '../note/list.js'

export default class Notes {
  constructor(categories) {
    this.categories = categories;
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
    return category.addNote(note);
  }

  remove(noteId) {
    let noteToRemove = this.get(noteId);
    let category = this.categories.get(noteToRemove.getCategoryId());
    return category.removeNote(noteId);
  }

  edit(noteEdit, tagsToAdd, tagsToRemove) {
    let currentNote = this.get(noteEdit.getId());
    let categoryEditedNote = this.categories.get(noteEdit.getCategoryId());
    if (currentNote.getCategoryId() === noteEdit.getCategoryId()) {
      return categoryEditedNote.editNote(noteEdit, tagsToAdd, tagsToRemove);
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
      return this.add(noteEdit);
    }
    return false;
  }
}