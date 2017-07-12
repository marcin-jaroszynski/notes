import Category from './category.js'
import ResourceList from '../resource/list.js'

export default class CategoryList extends ResourceList {
  add(title) {
    this.data.push(new Category({title: title}));
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

  findByCode(code) {
    let result = super.findByCode(code);
    if (!result.getCode()) {
      return new Category();
    }
    return result;
  }
}