import CategoryList from '../../../../src/model/category/list.js'
import Category from '../../../../src/model/category/category.js'

describe('Category model', () => {
  let getNonEmptyCategoryList = () => {
    let categoryToAdd = new Category({ title: 'Foo' });
    let categoryList = new CategoryList();
    categoryList.add(categoryToAdd);
    return categoryList;
  };

  it('Create empty category list object', () => {
    let categoryList = new CategoryList();
    expect(0).to.equal(categoryList.get().length, 'empty category list');
  });

  it('Add new Category object to list', () => {
    let categoryList = getNonEmptyCategoryList();
    expect(1).to.equal(categoryList.get().length, 'add category to list');
  });

  it('getTitleFor should return valid title of category', () => {
    let categoryList = getNonEmptyCategoryList();
    expect('Foo').to.equal(categoryList.getTitleFor('foo'));
  });

  it('getTitleFor should return title category as "undefined" string for invalid code category', () => {
    let categoryList = getNonEmptyCategoryList();
    expect('undefined').to.equal(categoryList.getTitleFor('whaaat'));
  });

  it('checkIsExist returns founded category by title', () => {
    let categoryList = getNonEmptyCategoryList();
    let categoryToCheckIsExist = categoryList.checkIsExist('Foo');
    expect('foo').to.equal(categoryToCheckIsExist.getCode());
  });

  it('checkIsExist returns empty object category for non-existing code', () => {
    let categoryList = getNonEmptyCategoryList();
    let categoryToCheckIsExist = categoryList.checkIsExist('non-exist-code');
    expect('').to.equal(categoryToCheckIsExist.getTitle());
  });

  it('findByCode returns founded object', () => {
    let categoryList = getNonEmptyCategoryList();
    let categoryToFind = categoryList.findByCode('foo');
    expect('Foo').to.equal(categoryToFind.getTitle());
  });

  it('findByCode returns not founded object - empty object', () => {
    let categoryList = getNonEmptyCategoryList();
    let categoryToFind = categoryList.findByCode('non-exist-code');
    expect('').to.equal(categoryToFind.getTitle());
  });

  it('changeTitle returns true - success to change title', () => {
    let currentTitleOfCategory = 'Foo';
    let newTitleOfCategory = 'New foo';
    let categoryList = getNonEmptyCategoryList();
    let categoryWithChangedName = categoryList.changeTitle(currentTitleOfCategory, newTitleOfCategory);
    expect(newTitleOfCategory).to.equal(categoryWithChangedName.getTitle());
  })
});