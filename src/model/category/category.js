import Helper from '../helper.js'
import Resource from '../resource/resource.js'
import CategoryTagList from './tagList.js'
import Notes from './notes.js'
import Url from '../url.js'

export default class Category extends Resource {
  constructor(data) {
    super(data);
    this.tags = new CategoryTagList();
    this.notes = new Notes();
  }

  createUrl() {
    return Url.getCategoryShow(this.code);
  }

  setTitle(title) {
    if (title) {
      this.code = Helper.slugify(title);
      this.url = this.createUrl();
      this.title = title;
      this.notes.updateAllCategoryId(this.code);
    }
  }

  addNote(note) {
    if (this.code) {
      this.notes.add(note);
      this.tags.addMany(note.tags.get());
      return true;
    }
    return false;
  }

  editNote(editedNote, tagsToAdd, tagsToRemove) {
    if (this.code) {
      if (this.notes.edit(editedNote)) {
        this.tags.removeMany(tagsToRemove.get());
        this.tags.addMany(tagsToAdd.get());
        return true;
      }
    }
    return false; 
  }

  removeNote(noteId) {
    if (this.code) {
      let noteToRemove = this.notes.get(noteId);
      this.tags.removeMany(noteToRemove.tags.get());
      return this.notes.remove(noteId);
    } 
    return false;
  }
}