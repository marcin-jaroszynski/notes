import Stack from '../stack.js'

export default class Dashboard {
  constructor() {
    this.data = new Stack();
  }

  get() {
    return this.data;
  }

  add(note) {
    this.data.push(note);
  }

  peek() {
    return this.data.peek();
  }

  floor() {
    return this.data.floor();
  }
}