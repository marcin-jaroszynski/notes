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

  getAllAsHash() {
    let data = {};
    let categories = this.categories.get();
    for (let i = 0; i < categories.length; i++) {
      data[categories[i].getCode()] = categories[i];
    }
    return data;
  }

  getTagsFor(categoryId) {
    let categoryToFind = this.categories.findByCode(categoryId);
    return categoryToFind.getTags();
  }

  getNotesFor(categoryId) {
    let categoryToFind = this.categories.findByCode(categoryId);
    return categoryToFind.notes.getAll();
  }

  getTitleFor(categoryId) {
      let categoryToFind = this.categories.findByCode(categoryId);
      return categoryToFind.getTitle();
  }
 
  isExist(category) {
    let categoryToFind = this.categories.checkIsExist(category.getTitle());
    if (!categoryToFind.isExist()) {
      return true;
    }
    return false;
  }

  add(category) {
    this.categories.add(category);
  }

  changeTitle(currentCategoryTitle, newCategoryTitle) {
    let categoryForWhichToChangeTitle = this.categories.checkIsExist(currentCategoryTitle);
    if (categoryForWhichToChangeTitle.getTitle() == currentCategoryTitle) {
      let categoryWithNewTitle = this.categories.checkIsExist(newCategoryTitle);
      if (categoryWithNewTitle.getTitle() == '') {
        categoryForWhichToChangeTitle.setTitle(newCategoryTitle);
        return categoryForWhichToChangeTitle;
      }
    }
    return new Category();
  }
}