import TagList from '../tag/list.js'
import Url from '../url.js'

export default class Note {
  constructor() {
    let empty = this.getEmptyObject();
    this.id = empty.id;
    this.categoryId = empty.categoryId;
    this.title = empty.title;
    this.content = empty.content;
    this.url = empty.url;
    this.tags = empty.tags;
    this.dateAdded = '04.06.2017 22:17:25';
  }

  setId(id) {
    this.id = id;
    this.url = this.createUrl();
  }

  setCategoryId(categoryId) {
    this.categoryId = categoryId;
  }

  setTitle(title) {
    this.title = title;
  }

  setContent(content) {
    this.content = content;
  }

  createUrl() {
    return Url.getNoteShow(this.id);
  }

  addTag(title) {
    return this.tags.add(title);
  } 

  removeTag(title) {
    return this.tags.remove(title);
  }

  getId() {
    return this.id;
  }

  getCategoryId() {
    return this.categoryId;
  }

  getTitle() {
    return this.title;
  }

  getContent() {
    return this.content;
  }

  getTags() {
    return this.tags.get();
  }

  getDateAdded() {
    return this.dateAdded;
  }

  getEmptyObject() {
    return {
      id: 0,
      categoryId: '',
      title: '',
      content: '',
      url: '',
      tags: new TagList(),
      dateAdded: ''
    }
  }
}