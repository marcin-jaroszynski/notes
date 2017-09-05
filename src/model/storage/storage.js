import Categories from './categories.js'
import Notes from './notes.js'

export default class Storage {
  constructor() {
    this.categories = new Categories();
    this.notes = new Notes(this.categories);
  }
}