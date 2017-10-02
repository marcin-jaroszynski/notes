import Category from '../../../../src/model/category/category.js'
import StorageCategories from '../../../../src/model/storage/categories.js'
import Dashboard from '../../../../src/model/dashboard/dashboard.js'

describe('Storage categories', () => {
  let getFooCategory = () => {
    return new Category({ title: 'Foo' });
  };

  let getStorageCategories = () => {
    let dashboard = new Dashboard();
    return new StorageCategories(dashboard); 
  };

  let getStorageCategoriesWithAddedFooCategory = () => {
    let categoryToAdd = getFooCategory();
    let storageCategories = getStorageCategories();
    storageCategories.add(categoryToAdd.getTitle());
    return storageCategories;
  };

  it('Add category', () => {
    let categoryToAdd = new Category({ title: 'Foo' });
    let storageCategories = getStorageCategories();
    let result = storageCategories.add(categoryToAdd.getTitle());
    expect(true).to.equal(result);
    let addedCategory = storageCategories.get(categoryToAdd.getCode());
    expect(categoryToAdd.getTitle()).to.equal(addedCategory.getTitle());
    expect(categoryToAdd.getCode()).to.equal(addedCategory.getCode());
  });

  it('Try to add category with the title that exist - should fail', () => {
    let storageCategories = getStorageCategories();
    expect(true).to.equal(storageCategories.add('Foo'), 'add first Foo category');
    expect(false).to.equal(storageCategories.add('Foo'), 'try to add second Foo category');
  });

  it('getTitleFor should return valid title of category', () => {
    let fooCategory = getFooCategory();
    let storageCategories = getStorageCategoriesWithAddedFooCategory();

    expect('Foo').to.equal(storageCategories.getTitleFor(fooCategory.getCode()));
  });

  it('getTitleFor should return title category as empty string for invalid code category', () => {
    let storageCategories = getStorageCategoriesWithAddedFooCategory();
    expect('').to.equal(storageCategories.getTitleFor('whaaat'));
  });

  it('changeTitle returns true - success to change title', () => {
    let fooCategory = getFooCategory();
    let storageCategories = getStorageCategoriesWithAddedFooCategory();
    let currentTitleOfCategory = fooCategory.getTitle();
    let newTitleOfCategory = 'New foo';
    let categoryWithChangedName = storageCategories.changeTitle(currentTitleOfCategory, newTitleOfCategory);
    expect(newTitleOfCategory).to.equal(categoryWithChangedName.getTitle());
  });

  it('Attempt to add two categories with the same title will failure', () => {
    let fooCategory = getFooCategory();
    let storageCategories = getStorageCategoriesWithAddedFooCategory();
    let result = storageCategories.add(fooCategory.getTitle());
    expect(false).to.equal(result);
  });
});