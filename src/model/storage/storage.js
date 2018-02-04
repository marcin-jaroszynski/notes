import Categories from './categories.js'
import Notes from './notes.js'
import Dashboard from '../dashboard/dashboard.js'
import Tags from './tags.js'
import Category from '../category/category.js'
import Note from '../note/note.js'

export default class Storage {
  constructor() {
    this.dashboard = new Dashboard();
    this.categories = new Categories(this.dashboard);
    this.notes = new Notes(this.categories, this.dashboard);
    this.tags = new Tags(this.categories);
  }

  init(data) {
    let categoriesMap = this._initCategories(data.categories);
    this._initDashboard(data.dashboard, categoriesMap);
  }

  _initCategories(categories) {
    let categoryMap = new Map();
    for (let i = 0; i < categories.length; i++) {
      let category = new Category({title: categories[i].title });
      category.setTags(categories[i].tags);
      this.categories.add(category); 
      categoryMap.set(category.getCode(), category);
    }
    return categoryMap;
  }

  _initDashboard(dashboard, categoriesMap) {
    for (let i = 0; i < dashboard.length; i++) {
      if (categoriesMap.has(dashboard[i].category)) {
        let categoryNote = categoriesMap.get(dashboard[i].category);
        let note = new Note();
        note.setId(dashboard[i]._id);
        note.setTitle(dashboard[i].title);
        note.setCategoryId(dashboard[i].category);
        note.setDateAdded(dashboard[i].created_date);
        this.dashboard.add(note, categoryNote);
      }
    }
  }
}