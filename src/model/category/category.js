import Helper from '../helper.js'
import Resource from '../resource/resource.js'
import TagList from '../tag/list.js'
import Note from '../note/note.js'
import Url from '../url.js'

export default class Category extends Resource {
  constructor(data) {
    super(data);
    this.notes = [];
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
    return this.notes;
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
      this.notes.push(note);
      this.tags.addMany(note.getTags());
    }
  }

  getNote(noteId) {
    for (let i = 0; i < this.notes.length; i++) {
      if (this.notes[i].getId() == noteId) {
        return this.notes[i];
      }
    }
    return new Note();
  }

  editNote(noteToEdit) {
    if (this.code) {
      let noteToFind = this.getNote(noteToEdit.getId());
      if (noteToFind.getId()) {
        noteToFind.setTitle(noteToEdit.getTitle())
        noteToFind.setContent(noteToEdit.getContent());
        noteToFind.setTags(noteToEdit.getTags());
        // this.tags.removeMany(noteToEdit.tagsToRemove);
        // this.tags.addMany(noteToEdit.tagsToAdd);
        return true;
      }
    } else {
      console.log('editNote: B');
    }
    return false;
  }
}