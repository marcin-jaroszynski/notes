import Helper from '../helper.js'
import Resource from '../resource/resource.js'
import CategoryTagList from './tagList.js'
import Notes from './notes.js'
import Url from '../url.js' 

export default class Category extends Resource {
  constructor(data) {
    super(data);
    this._tags = new CategoryTagList();
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
      this._tags.addMany(note.tags.get());
      return true;
    }
    return false;
  }

  editNote(editedNote) {
    if (this.code) {
      let currentNote = this.notes.get(editedNote.getId());
      let tagsToUpdate = currentNote.tags.compare(editedNote.tags);
      if (this.notes.edit(editedNote)) {
        this._tags.removeMany(tagsToUpdate.toRemove.get());
        this._tags.addMany(tagsToUpdate.toAdd.get());
        return true;
      }
    }
    return false; 
  }

  removeNote(noteId) {
    if (this.code) {
      let noteToRemove = this.notes.get(noteId);
      this._tags.removeMany(noteToRemove.tags.get());
      return this.notes.remove(noteId);
    } 
    return false;
  }

  getTags() {
    return this._tags.get();
  }

  isHasTag(tagCode) {
    return this._tags.findByCode(tagCode);
  }

  isExist() {
    return (this.getTitle() === '' && this.getCode() === '');
  }
}