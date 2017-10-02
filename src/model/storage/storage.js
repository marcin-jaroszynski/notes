import Categories from './categories.js'
import Notes from './notes.js'
import Dashboard from '../dashboard/dashboard.js'

export default class Storage {
  constructor() {
    this.dashboard = new Dashboard();
    this.categories = new Categories(this.dashboard);
    this.notes = new Notes(this.categories, this.dashboard);
  }
}