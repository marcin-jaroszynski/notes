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

  getForTag(tagCode) {
    let notesList = []; 
    let categories = this.categories.getAll();
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].isHasTag(tagCode)) {
        let notes = categories[i].notes.getAll();
        for (let j = 0; j < notes.length; j++) {
          if (notes[j].tags.isInclude(tagCode)) {
            notesList.push({
              categoryTitle: categories[i].getTitle(),
              categoryUrl: categories[i].getUrl(),
              noteTitle: notes[j].getTitle(),
              noteUrl: notes[j].getUrl(),
              noteDateAdded: notes[j].getDateAdded()
            });
          }
        }
      }
    }
    return notesList;
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
    if (categoryEditedNote.editNote(editedNote)) {
      this.dashboard.updateEntry(editedNote, categoryEditedNote);
      return true;
    }
    return false;
  }

  _changeCategory(editedNote, currentNote) {
    let categoryEditedNote = this.categories.get(editedNote.getCategoryId());
    if (categoryEditedNote.getTitle()) {
      let currentCategoryNote = this.categories.get(currentNote.getCategoryId());
      let resultRemoveNote = currentCategoryNote.removeNote(currentNote.getId());
      if (resultRemoveNote) {
        if (categoryEditedNote.addNote(editedNote)) {
          this.dashboard.updateEntry(editedNote, categoryEditedNote);
          return true;
        }
      }
    }
    return false;
  }
}