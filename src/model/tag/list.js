import Tag from './tag.js'

export default class TagList {
  constructor() {
    this.data = [];
  }

  add(title) {
    this.data.push(new Tag({title: title}));
  }

  get() {
    return this.data;
  }

  checkIsExist(title) {
    let tagToFind = new Tag({title: title});
    return this.findByCode(tagToFind.getCode());
  }

  findByCode(code) {
    let index = this._getIndexFor(code);
    if (index !== -1) {
      return this.data[index];
    }
    return new Tag();
  }

  _getIndexFor(code) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].getCode() == code) {
        return i;
      }
    }
    return -1;
  }

  remove(title) {
    let tagToRemove = new Tag({title: title});
    let indexToRemove = this._getIndexFor(tagToRemove.getCode());
    if (indexToRemove !== -1) {
      this.data.splice(indexToRemove, 1);
      return true;
    }
    return false;
  }
}