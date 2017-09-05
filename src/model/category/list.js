import Category from './category.js'
import ResourceList from '../resource/list.js'

export default class CategoryList extends ResourceList {
  add(title) {
    this.data.push(new Category({title: title}));
  }

  findByCode(code) {
    let result = super.findByCode(code);
    if (!result.getCode()) {
      return new Category();
    }
    return result;
  }
}