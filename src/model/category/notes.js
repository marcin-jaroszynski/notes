import NoteList from '../note/list.js'

export default class Notes {
  constructor() {
    this.data = new NoteList();
  }

  get(id) {
    return this.data.getFor(id);
  }
  
  getAll() {
    return this.data.get();
  }

  add(note) {
    this.data.add(note);
  }

  edit(note) {
    let noteToEdit = this.get(note.getId());
    if (noteToEdit.getId()) {
      noteToEdit.setTitle(note.getTitle())
      noteToEdit.setContent(note.getContent());
      noteToEdit.tags.set(note.tags.get());
      return true;
    }
    return false;
  }

  remove(id) {
    return this.data.remove(id);
  }
}