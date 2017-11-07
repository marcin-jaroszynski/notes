import Category from '../../../../src/model/category/category.js'
import StorageCategories from '../../../../src/model/storage/categories.js'
import TagList from '../../../../src/model/tag/list.js'
import Note from '../../../../src/model/note/note.js'
import Dashboard from '../../../../src/model/dashboard/dashboard.js'

describe('Storage categories', () => {
  let getCategory = (title) => {
    return new Category({ title: title });
  }; 

  let getNote = (title, categoryId, tags) => {
    let note = new Note();
    note.setTitle(title);
    note.setContent(title +' - Content');
    note.setCategoryId(categoryId);
    note.tags.addMany(tags.get());
    return note;
  };

  let getTagList = (tags) => {
    let tagList = new TagList();
    for (let i = 0; i < tags.length; i++) {
      tagList.add(tags[i]);
    }
    return tagList;
  };

  let getStorageCategories = () => {
    let dashboard = new Dashboard();
    return new StorageCategories(dashboard); 
  };

  let getStorageCategoriesWithAddedFooCategory = () => {
    let categoryToAdd = getCategory('Foo');
    let storageCategories = getStorageCategories();
    storageCategories.add(categoryToAdd);
    return storageCategories;
  };

  it('Add category with tags', () => {
    let categoryToAdd = getCategory('Foo');
    let note = getNote('Note 1', 1, getTagList(['A', 'B']));
    categoryToAdd.addNote(note);
    let storageCategories = getStorageCategories();
    let result = storageCategories.add(categoryToAdd);
    expect(true).to.equal(result, 'Result of add new category should be successful');
    let addedCategory = storageCategories.get(categoryToAdd.getCode());
    expect(categoryToAdd.getTitle()).to.equal(addedCategory.getTitle());
    expect(categoryToAdd.getCode()).to.equal(addedCategory.getCode());
    let tagsAddedCategory = addedCategory.tags.get();
    expect(2).to.equal(tagsAddedCategory.length);
  });

  it('Try to add category with the title that exist - should fail', () => {
    let storageCategories = getStorageCategories();
    let categoryFoo = getCategory('Foo');
    expect(true).to.equal(storageCategories.add(categoryFoo), 'add first Foo category');
    expect(false).to.equal(storageCategories.add(categoryFoo), 'try to add second Foo category');
  });

  it('getTitleFor should return valid title of category', () => {
    let categoryFoo = getCategory('Foo');
    let storageCategories = getStorageCategoriesWithAddedFooCategory();

    expect('Foo').to.equal(storageCategories.getTitleFor(categoryFoo.getCode()));
  });

  it('getTitleFor should return title category as empty string for invalid code category', () => {
    let storageCategories = getStorageCategoriesWithAddedFooCategory();
    expect('').to.equal(storageCategories.getTitleFor('whaaat'));
  });

  it('changeTitle returns true - success to change title', () => {
    let categoryFoo = getCategory('Foo');
    let storageCategories = getStorageCategoriesWithAddedFooCategory();
    let currentTitleOfCategory = categoryFoo.getTitle();
    let newTitleOfCategory = 'New foo';
    let categoryWithChangedName = storageCategories.changeTitle(currentTitleOfCategory, newTitleOfCategory);
    expect(newTitleOfCategory).to.equal(categoryWithChangedName.getTitle());
  });

  it('Attempt to add two categories with the same title will failure', () => {
    let categoryFoo = getCategory('Foo');
    let storageCategories = getStorageCategoriesWithAddedFooCategory();
    let result = storageCategories.add(categoryFoo);
    expect(false).to.equal(result);
  }); 
});