import Tag from '../tag/tag.js'

export default class CategoryTagList {
  constructor() {
    this.data = {};
  }

  get() {
    return this.data;
  }

  add(title) {
    let tag = new Tag({title: title});
    if (!this.checkIsExist(tag.getCode())) {
      this.init(tag.getCode());
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
    return this.data[tagCode];
  }

  init(tagCode) {
    this.data[tagCode] = 0;
  }

  incrementCounter(tagCode) {
    this.data[tagCode]++;
  }

  decrementCounter(tagCode) {
    if (this.data[tagCode] > 0) {
      this.data[tagCode]--;
    }
  }
}