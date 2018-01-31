import Category from './category.js'
import ResourceList from '../resource/list.js'
import Helper from '../helper.js'

export default class CategoryList extends ResourceList {
  add(category) {
    this.data.push(Helper.clone(category));
  }

  set(category) {
    this.data.push(category);
  }

  findByCode(code) {
    let result = super.findByCode(code);
    if (!result.getCode()) {
      return new Category();
    }
    return result;
  }
}