import CategoryList from '../../../../src/model/category/list.js'
import Category from '../../../../src/model/category/category.js'

describe('Category list model', () => {
  let getNonEmptyCategoryList = () => {
    let categoryList = new CategoryList();
    categoryList.add('Foo');
    return categoryList;
  };

  it('getTitleFor should return valid title of category', () => {
    let categoryList = getNonEmptyCategoryList();
    expect('Foo').to.equal(categoryList.getTitleFor('foo'));
  });

  it('getTitleFor should return title category as "undefined" string for invalid code category', () => {
    let categoryList = getNonEmptyCategoryList();
    expect('undefined').to.equal(categoryList.getTitleFor('whaaat'));
  });

  it('changeTitle returns true - success to change title', () => {
    let currentTitleOfCategory = 'Foo';
    let newTitleOfCategory = 'New foo';
    let categoryList = getNonEmptyCategoryList();
    let categoryWithChangedName = categoryList.changeTitle(currentTitleOfCategory, newTitleOfCategory);
    expect(newTitleOfCategory).to.equal(categoryWithChangedName.getTitle());
  })
});