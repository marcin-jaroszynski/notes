import Category from './category.js'
import ResourceList from '../resource/list.js'

export default class CategoryList extends ResourceList {
  add(category) {
    let newCategory = new Category({title: category.getTitle()});
    let notes = category.notes.getAll();
    for (let i = 0; i < notes.length; i++) {
      newCategory.addNote(notes[i]);
    }
    this.data.push(newCategory);
  }

  findByCode(code) {
    let result = super.findByCode(code);
    if (!result.getCode()) {
      return new Category();
    }
    return result;
  }
}