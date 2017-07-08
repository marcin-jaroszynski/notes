import Helper from '../helper.js'
import Resource from '../resource/resource.js'
import TagList from '../tag/list.js'
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

  addNote(note) {
    note.setCategoryId(this.code);
    this.notes.push(note);
    this.tags.addMany(note.getTags());
  }
}