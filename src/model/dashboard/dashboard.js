import Stack from '../stack.js'
import DashboardItem from './item.js'

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