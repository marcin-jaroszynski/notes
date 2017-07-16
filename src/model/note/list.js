import Note from './note.js'

export default class NoteList {
  constructor() {
    this.data = [];
  }

  get() {
    return this.data;
  }

  add(note) {
    this.data.push(note);
  }

  getFor(noteId) {
    let noteToReturn = new Note();
    let noteIndex = this._getIndexFor(noteId);
    if (noteIndex !== -1) {
      noteToReturn = this.data[noteIndex]; 
    }
    return noteToReturn;
  }

  remove(noteId) {
    let noteIndexToRemove = this._getIndexFor(noteId);
    if (noteIndexToRemove !== -1) {
      this.data.splice(noteIndexToRemove, 1);
      return true;
    }
    return false;
  }

  _getIndexFor(id) {
    let notFound = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].getId() == id) {
        return i;
      }
    }
    return notFound;
  }
}