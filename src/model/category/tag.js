import Tag from '../tag/tag.js'

export default class CategoryTag extends Tag {
  constructor(data) {
    super(data);
    this.counter = (data.counter) ? data.counter : 0;
  }
  
  getCounter() {
    return this.counter;
  }

  setCounter(value) {
    this.counter = value;
  } 

  getEmptyObject() {
    let emptyData = super.getEmptyObject();
    emptyData.counter = 0;
    return emptyData;
  }
}