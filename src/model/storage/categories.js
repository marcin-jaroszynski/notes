import Category from '../category/category.js'
import CategoryList from '../category/list.js'

export default class Categories {
  constructor(dashboard) {
    this.categories = new CategoryList();
    this.dashboard = dashboard;
  }

  get(categoryId) {
    return this.categories.findByCode(categoryId);
  }

  getAll() {
    return this.categories.get();
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

  add(category) {
    let result = this.categories.checkIsExist(category.getTitle());
    if (result.getTitle()) {
      return false;
    }
    this.categories.add(category);
    return true;
  }

  changeTitle(currentCategoryTitle, newCategoryTitle) {
    let categoryForWhichToChangeTitle = this.categories.checkIsExist(currentCategoryTitle);
    if (categoryForWhichToChangeTitle.getTitle() == currentCategoryTitle) {
      let categoryWithNewTitle = this.categories.checkIsExist(newCategoryTitle);
      if (categoryWithNewTitle.getTitle() == '') {
        categoryForWhichToChangeTitle.setTitle(newCategoryTitle);
        this.dashboard.updateCategories(currentCategoryTitle, newCategoryTitle);
        return categoryForWhichToChangeTitle;
      }
    }
    return new Category();
  }
}