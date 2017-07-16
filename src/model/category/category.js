import Helper from '../helper.js'
import Resource from '../resource/resource.js'
import TagList from '../tag/list.js'
import Note from '../note/note.js'
import NoteList from '../note/list.js'
import Url from '../url.js'

export default class Category extends Resource {
  constructor(data) {
    super(data);
    this.notes = new NoteList();
    this.tags = new TagList();
  }

  createUrl() {
    return Url.getCategoryShow(this.code);
  }

  setTitle(title) {
    if (title) {
      this.code = Helper.slugify(title);
      this.url = this.createUrl();
      this.title = title;
    }
  }

  getNotes() {
    return this.notes.get();
  }

  getTags() {
    return this.tags.get();
  }

  addTags(tags) {
    if (this.code) {
      this.tags.addMany(tags);
    }
  }

  removeTags(tags) {
    if (this.code) {
      this.tags.removeMany(tags);
    }
  }

  addNote(note) {
    if (this.code) {
      note.setCategoryId(this.code);
      this.notes.add(note);
      this.tags.addMany(note.getTags());
      return true;
    }
    return false;
  }

  getNote(noteId) {
    return this.notes.getFor(noteId);
  }

  editNote(noteToEdit) {
    if (this.code) {
      let noteToFind = this.getNote(noteToEdit.getId());
      if (noteToFind.getId()) {
        noteToFind.setTitle(noteToEdit.getTitle())
        noteToFind.setContent(noteToEdit.getContent());
        noteToFind.setTags(noteToEdit.getTags());
        return true;
      }
    }
    return false;
  }

  removeNote(noteId) {
    if (this.code) {
      console.log('[CODE]: ' + this.code);
      let noteToRemove = this.getNote(noteId);
      this.removeTags(noteToRemove.getTags());
      return this.notes.remove(noteId);
    }
    return false;
  }
}