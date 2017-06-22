import Resource from './resource.js'

export default class ResourceList {
  constructor() {
    this.data = [];
  }

  add(title) {
    this.data.push(new Resource({title: title}));
  }

  get() {
    return this.data;
  }

  checkIsExist(title) {
    let tagToFind = new Resource({title: title});
    return this.findByCode(tagToFind.getCode());
  }

  findByCode(code) {
    let index = this._getIndexFor(code);
    if (index !== -1) {
      return this.data[index];
    }
    return new Resource();
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
    let tagToRemove = new Resource({title: title});
    let indexToRemove = this._getIndexFor(tagToRemove.getCode());
    if (indexToRemove !== -1) {
      this.data.splice(indexToRemove, 1);
      return true;
    }
    return false;
  }
}