import Category from '../category/category.js'
import CategoryList from '../category/list.js'

export default class Categories {
  constructor() {
    this.categories = new CategoryList();
  }

  get(categoryId) {
    return this.categories.findByCode(categoryId);
  }

  getAll() {
    return this.categories.get();
  }

  getTagsFor(categoryId) {
    let categoryToFind = this.categories.findByCode(categoryId);
    return categoryToFind.tags.get();
  }

  getNotesFor(categoryId) {
    let categoryToFind = this.categories.findByCode(categoryId);
    return categoryToFind.notes.getAll();
  }

  getTitleFor(categoryId) {
      let categoryToFind = this.categories.findByCode(categoryId);
      return categoryToFind.getTitle();
  }

  add(title) {
    let result = this.categories.checkIsExist(title);
    if (!result.getTitle()) {
      this.categories.add(title);
      return true;
    }
    return false; 
  }

  changeTitle(currentCategoryTitle, newCategoryTitle) {
    let categoryToChangeTitle = this.categories.checkIsExist(currentCategoryTitle);
    if (categoryToChangeTitle.getTitle() == currentCategoryTitle) {
      let categoryWithNewTitle = this.categories.checkIsExist(newCategoryTitle);
      if (categoryWithNewTitle.getTitle() == '') {
        categoryToChangeTitle.setTitle(newCategoryTitle);
        return categoryToChangeTitle;
      }
    }
    return new Category();
  }
}