import Helper from './Helper.js';

describe('Storage categories', () => {
  let getStorageCategoriesWithAddedFooCategory = () => {
    let categoryToAdd = Helper.getCategory('Foo');
    let storageCategories = Helper.getStorageCategories();
    storageCategories.add(categoryToAdd);
    return storageCategories;
  };

  it('Add category with tags', () => {
    let categoryToAdd = Helper.getCategory('Foo');
    let note = Helper.getNote('Note 1', ['X', 'Y']);
    categoryToAdd.addNote(note);
    
    let storageCategories = Helper.getStorageCategories();
    storageCategories.add(categoryToAdd);
    let addedCategory = storageCategories.get(categoryToAdd.getCode());
    expect(categoryToAdd.getTitle()).to.equal(addedCategory.getTitle());
    expect(categoryToAdd.getCode()).to.equal(addedCategory.getCode());
    let tagsAddedCategory = addedCategory.getTags();
    expect(2).to.equal(tagsAddedCategory.length);
  });

  it('Try to add category with the title that exist - should fail', () => {
    let storageCategories = Helper.getStorageCategories();
    let categoryFoo = Helper.getCategory('Foo');
    storageCategories.add(categoryFoo);
    let resultSecondAttemptToAddFooCategory = false;
    if (!storageCategories.isExist(categoryFoo)) {
      storageCategories.add(categoryFoo);
      resultSecondAttemptToAddFooCategory = true;
    }
    expect(false).to.equal(resultSecondAttemptToAddFooCategory, 'try to add second Foo category');
  });

  it('getTitleFor should return valid title of category', () => {
    let categoryFoo = Helper.getCategory('Foo');
    let storageCategories = getStorageCategoriesWithAddedFooCategory();

    expect('Foo').to.equal(storageCategories.getTitleFor(categoryFoo.getCode()));
  });

  it('getTitleFor should return title category as empty string for invalid code category', () => {
    let storageCategories = getStorageCategoriesWithAddedFooCategory();
    expect('').to.equal(storageCategories.getTitleFor('whaaat'));
  });

  it('changeTitle returns true - success to change title', () => {
    let categoryFoo = Helper.getCategory('Foo');
    let storageCategories = getStorageCategoriesWithAddedFooCategory();
    let currentTitleOfCategory = categoryFoo.getTitle();
    let newTitleOfCategory = 'New foo';
    let categoryWithChangedName = storageCategories.changeTitle(currentTitleOfCategory, newTitleOfCategory);
    expect(newTitleOfCategory).to.equal(categoryWithChangedName.getTitle());
  });
});