import Helper from './Helper.js';

describe('Storage tags', () => {
  it('Return specific tag', () => {
    let tagFoo = Helper.getTag('Foo');
    let category = Helper.getCategory('JavaScript');
    let storage = Helper.getStorage();
    storage.categories.add(category);
    let note = Helper.getNote('Note 1', ['Bar', tagFoo.getTitle()]);
    note.setCategoryId(category.getCode()); 
    storage.notes.add(note);
    let tagToFind = storage.tags.tag(tagFoo.getCode());
    expect(tagFoo.getTitle()).to.equal(tagToFind.getTitle(), 'Foo tag');
  });
});