import Category from './category.js'
import CategoryList from './list.js'

export default class CategoryStorage {
  constructor() {
    this.list = new CategoryList();
    this.list.add('CSS');
    this.list.add('JavaScript');
    this.list.add('HTML 5');
    this.list.add('PHP');
    this.list.add('MySQL');
  }

  getList() {
    return this.list.get();
  }

  getTitleFor(categoryCode) {
    return this.list.getTitleFor(categoryCode);
  }

  add(title) {
    let categoryToAdd = new Category(title);
    let result = this.list.checkIsExist(title);
    if (result.getTitle()) {
      return false;
    }
    this.list.add(title); 
    return true;
  }

  changeTitle(currentCategoryTitle, newCategoryTitle) {
    return this.list.changeTitle(currentCategoryTitle, newCategoryTitle);
  }
}