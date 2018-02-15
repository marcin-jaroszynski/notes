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

  peek() {
    return this.data.peek();
  }

  floor() {
    return this.data.floor();
  }

  length() {
    return this.data.length();
  }

  reset() {
    this.data = new Stack();
  }
}