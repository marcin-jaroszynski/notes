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
}