import CategoryTagList from './tagList.js'
import TagList from '../tag/list.js'

export default class Tags {
  constructor(categoryId) {
    this.categoryId = categoryId;
    this.data = new CategoryTagList();
  }

  get() {
    return this.data.get();
  }

  addMany(tags) {
    if (this.categoryId) {
      this.data.addMany(tags);
    }
    return false;
  }

  removeMany(tags) {
    if (this.categoryId) {
      this.data.removeMany(tags);
    }
    return false;
  }
}