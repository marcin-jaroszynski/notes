import Category from './category.js'

export default class CategoryList {
  constructor() {
    this.data = [];
  }

  add($category) {
    this.data.push($category);
  }

  get() {
    return this.data;
  }

  getTitleFor(categoryCode) {
    let categoryTitle = 'undefined';
    let categoryToFind = this.findByCode(categoryCode);
    if (categoryToFind.getTitle()) {
      categoryTitle = categoryToFind.getTitle();
    }
    return categoryTitle;
  }

  checkIsExist(categoryTitle) {
    let categoryToFind = new Category({ title: categoryTitle });
    return this.findByCode(categoryToFind.getCode());
  }

  findByCode(categoryCode) {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].getCode() == categoryCode) {
        return this.data[i];
      }
    }
    return new Category();
  }
}