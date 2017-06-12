import Category from './category/category.js'
import CategoryList from './category/list.js'

export default class CategoryStorage {
  constructor() {
    this.categoryList = new CategoryList();
    this.categoryList.add(new Category({ title: 'CSS' }));
    this.categoryList.add(new Category({ title: 'JavaScript' }));
    this.categoryList.add(new Category({ title: 'HTML 5' }));
    this.categoryList.add(new Category({ title: 'PHP' }));
    this.categoryList.add(new Category({ title: 'MySQL' }));
  }

  getList() {
    return this.categoryList.get();
  }
}