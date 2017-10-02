import Stack from '../stack.js'
import DashboardItem from './item.js'
import Category from '../category/category.js'

export default class Dashboard {
  constructor() {
    this.data = new Stack();
  }

  get() {
    return this.data.getAll();
  }

  add(note, category) {
    let newDashboardItem = new DashboardItem();
    newDashboardItem.setNoteTitle(note.getTitle());
    newDashboardItem.setNoteUrl(note.getUrl());
    newDashboardItem.setNoteDateAdded(note.getDateAdded());
    newDashboardItem.setCategoryTitle(category.getTitle());
    newDashboardItem.setCategoryUrl(category.getUrl());
    this.data.push(newDashboardItem);
  }

  updateCategories(oldTitleCategory, newTitleCategory) {
    let dasboardItems = this.data.getAll();
    let newCategory = new Category({title: newTitleCategory});
    for (let i = 0; i < dasboardItems.length; i++) {
      if (dasboardItems[i].getCategoryTitle() === oldTitleCategory) {
        dasboardItems[i].setCategoryTitle(newCategory.getTitle());
        dasboardItems[i].setCategoryUrl(newCategory.getUrl());
      }
    }
  }

  peek() {
    return this.data.peek();
  }

  floor() {
    return this.data.floor();
  }

  length() {
    return this.data.length();
  }
}