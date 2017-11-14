import Helper from './Helper.js';

describe('Storage tags', () => {
  it('Return specific tag', () => {
    let tagFoo = Helper.getTag('Foo');
    let category = Helper.getCategory('JavaScript');
    let note = Helper.getNote('Note 1', ['Bar', tagFoo.getTitle()]);
    note.setId(1); 
    category.addNote(note);
    let storage = Helper.getStorage();
    storage.categories.add(category);
    let tagToFind = storage.tags.tag(tagFoo.getCode());
    expect(tagFoo.getTitle()).to.equal(tagToFind.getTitle(), 'Foo tag');
  });
});