import Category from './category.js'
import list from './list.js'

export default class CategoryStorage {
  constructor() {
    this.list = new list();
    this.list.add(new Category({ title: 'CSS' }));
    this.list.add(new Category({ title: 'JavaScript' }));
    this.list.add(new Category({ title: 'HTML 5' }));
    this.list.add(new Category({ title: 'PHP' }));
    this.list.add(new Category({ title: 'MySQL' }));
  }

  getList() {
    return this.list.get();
  }

  getTitleFor(categoryCode) {
    return this.list.getTitleFor(categoryCode);
  }

  add(categoryTitle) {
    let categoryToAdd = new Category({ title: categoryTitle });
    let result = this.list.checkIsExist(categoryToAdd.getCode());
    if (result.getTitle()) {
      return false;
    }
    this.list.add(categoryToAdd); 
    return true;
  }

  changeTitle(currentCategoryTitle, newCategoryTitle) {
    return this.list.changeTitle(currentCategoryTitle, newCategoryTitle);
  }
}