import TagList from '../tag/list.js'

export default class Note {
  constructor() {
    let empty = this.getEmptyObject();
    this.id = empty.id;
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

  setTitle(title) {
    this.title = title;
  }

  setContent(content) {
    this.content = content;
  }

  createUrl() {
    return '/note/show/' + this.id;
  }

  addTag(title) {
    let tagToFind = this.tags.checkIsExist(title);
    if (!tagToFind.getTitle()) {
      this.tags.add(title);
      return true;
    }
    return false;
  }

  removeTag(title) {
    return this.tags.remove(title);
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

  getEmptyObject() {
    return {
      id: 0,
      title: '',
      content: '',
      url: '',
      tags: new TagList(),
      dateAdded: ''
    }
  }
}