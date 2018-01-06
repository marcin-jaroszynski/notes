import Categories from './categories.js'
import Notes from './notes.js'
import Dashboard from '../dashboard/dashboard.js'
import Tags from './tags.js'
import Category from '../category/category.js'

export default class Storage {
  constructor() {
    console.log('Storage.constructor');
    this.dashboard = new Dashboard();
    this.categories = new Categories(this.dashboard);
    this.notes = new Notes(this.categories, this.dashboard);
    this.tags = new Tags(this.categories);
  }

  init(data) {
    for (let i = 0; i < data.categories.length; i++) {
      let newCategory = new Category({title: data.categories[i].title });
      this.categories.add(newCategory);
    }
  }
}