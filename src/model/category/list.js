import Category from './category.js'
import ResourceList from '../resource/list.js'

export default class CategoryList extends ResourceList {
  add(title) {
    this.data.push(new Category({title: title}));
  }
  
  changeTitle(currentCategoryTitle, newCategoryTitle) {
    let categoryToChangeName = this.checkIsExist(currentCategoryTitle);
    if (categoryToChangeName.getTitle() == currentCategoryTitle) {
      let categoryWithNewName = this.checkIsExist(newCategoryTitle);
      if (categoryWithNewName.getTitle() == '') {
        categoryToChangeName.setTitle(newCategoryTitle);
        return categoryToChangeName;
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
}