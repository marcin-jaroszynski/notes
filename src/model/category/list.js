import Category from './category.js'
import ResourceList from '../resource/list.js'

export default class CategoryList extends ResourceList {
  add(title) {
    this.data.push(new Category({title: title}));
  }

  addNoteFor(categoryCode, note) {
    let categoryToFind = this.findByCode(categoryCode);
    if (categoryToFind.getTitle()) {
      categoryToFind.addNote(note);
      return true;
    }
    return false;
  }

  editNoteFor(categoryCode, note) {
    let categoryToFind = this.findByCode(categoryCode);
    if (categoryToFind.getTitle()) {
      categoryToFind.editNote(note);
      return true;
    }
    return false;
  }
  
  changeTitle(currentCategoryTitle, newCategoryTitle) {
    let categoryToChangeTitle = this.checkIsExist(currentCategoryTitle);
    if (categoryToChangeTitle.getTitle() == currentCategoryTitle) {
      let categoryWithNewTitle = this.checkIsExist(newCategoryTitle);
      if (categoryWithNewTitle.getTitle() == '') {
        categoryToChangeTitle.setTitle(newCategoryTitle);
        return categoryToChangeTitle;
      }
    }
    return new Category();
  }

  getTitleFor(categoryCode) {
    let categoryTitle = 'undefined';
    let categoryToFind = this.findByCode(categoryCode);
    if (categoryToFind.getTitle()) {
      categoryTitle = categoryToFind.getTitle();
    }
    return categoryTitle;
  }
}