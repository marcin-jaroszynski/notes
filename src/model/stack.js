export default class Stack {
  constructor() {
    this.data = [];
    this.top = 0;
    this.limit = 10;
  }

  push(value) {
    if (this.top === this.limit) {
      let tmpData = [];
      for (let j = 1; j < this.top; j++) {
        tmpData.push(this.data[j]);
      }
      this.data = tmpData;
      this.data[this.top-1] = value;
    } else {
      this.data[this.top++] = value;
    }
  }

  next() {
    if (this.top >= 0) {
      this.top = this.data.length-1;
    }
    return this.data[this.top--];
  }

  peek() {
    return this.data[this.top-1];
  }

  floor() {
    return this.data[0];
  }

  reset() {
    this.top = this.data.length-1;
  }

  length() {
    return this.data.length;
  }

  getAll() {
    return this.data;
  }
}