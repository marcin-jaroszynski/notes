import Tag from '../tag/tag.js'

export default class CategoryTagList {
  constructor() {
    this.data = {};
  }

  get() {
    let tags = [];
    for (let tagCode in this.data) {
      if (this.data[tagCode].counter > 0) {
        tags.push(this.data[tagCode].object);
      }
    }
    return tags;
  }

  getCounterFor(tagCode) {
    if (this.data[tagCode]) {
      return this.data[tagCode].counter;
    }
    return 0;
  }

  add(title) {
    let tag = new Tag({title: title});
    if (!this.checkIsExist(tag.getCode())) {
      this.init(tag);
    }
    this.incrementCounter(tag.getCode());
  }

  remove(title) {
    let tag = new Tag({title: title});
    if (this.checkIsExist(tag.getCode())) {
      this.decrementCounter(tag.getCode());
    }
  }

  addMany(tagsList) {
    for (let i = 0; i < tagsList.length; i++) {
      this.add(tagsList[i].title);
    }
  }

  removeMany(tagsList) {
    for (let i = 0; i < tagsList.length; i++) {
      this.remove(tagsList[i].title);
    }
  }

  checkIsExist(tagCode) {
    if (this.data[tagCode]) {
      if (this.data[tagCode].counter > 0) {
        return true;
      }
    }
    return false;
  }

  init(tag) {
    this.data[tag.getCode()] = {
      object: tag,
      counter: 0
    };
  }

  incrementCounter(tagCode) {
    this.data[tagCode].counter++;
  }

  decrementCounter(tagCode) {
    if (this.data[tagCode].counter > 0) {
      this.data[tagCode].counter--;
    }
  }

  isInclude(tagCode) {
    if (this.checkIsExist(tagCode)) {
      return true;
    }
    return false;
  }
}