import TagList from '../tag/list.js'

export default class Note {
  constructor() {
    let empty = this.getEmptyObject();
    this.title = empty.title;
    this.content = empty.content;
    this.tags = empty.tags;
  }

  setTitle(title) {
    this.title = title;
  }

  setContent(content) {
    this.content = content;
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

  getTags() {
    return this.tags.get();
  }

  getEmptyObject() {
    return {
      title: '',
      content: '',
      tags: new TagList()
    }
  }
}