import Categories from './categories.js'
import Notes from './notes.js'
import Dashboard from '../dashboard/dashboard.js'
import Tags from './tags.js'
import Category from '../category/category.js'
import Note from '../note/note.js'

export default class Storage {
  constructor() {
    this.dashboard = new Dashboard();
    this.categories = new Categories();
    this.notes = new Notes(this.categories);
    this.tags = new Tags(this.categories);
  }

  init(data) {
    let categoriesMap = this._initCategories(data.categories);
  }

  _initCategories(categories) {
    for (let i = 0; i < categories.length; i++) {
      let category = new Category({title: categories[i].title });
      category.setTags(categories[i].tags);
      this.categories.add(category); 
    }
  }
}