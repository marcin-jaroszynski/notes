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
    this.data.push(new DashboardItem(note, category));
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

  updateEntry(note, category) {
    let dashboardItemToEdit = this.find(note.getId());
    if (dashboardItemToEdit) {
      dashboardItemToEdit.setNoteTitle(note.getTitle());
      dashboardItemToEdit.setNoteUrl(note.getUrl());
      dashboardItemToEdit.setCategoryTitle(category.getTitle());
      dashboardItemToEdit.setCategoryUrl(category.getUrl());
      return true;
    }
    return false;
  }

  remove(noteId) {
    let dasboardItemIndexToRemove = this._getIndexFor(noteId);
    if (dasboardItemIndexToRemove !== -1) {
      let dasboardItems = this.data.getAll();
      dasboardItems.splice(dasboardItemIndexToRemove, 1);
      return true;
    }
    return false;
  }

  find(noteId) {
    let dasboardItemIndexToFind = this._getIndexFor(noteId);
    if (dasboardItemIndexToFind !== -1) {
      return this.data.getAll()[dasboardItemIndexToFind];
    }
    return false;
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

  _getIndexFor(noteId) {
    let notFound = -1;
    let dasboardItems = this.data.getAll(); 
    for (let i = 0; i < dasboardItems.length; i++) {
      if (dasboardItems[i].getNoteId() == noteId) {
        return i;
      }
    }
    return notFound;
  }
}