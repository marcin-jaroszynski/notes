import CategoryStorage from '../../../../src/model/category/storage.js'

describe('CategoryStorage', () => {
  it('add non-existing category', () => {
    let categoryStorage = new CategoryStorage();
    expect(true).to.equal(categoryStorage.add('Foo'));
  });

  it('try to add existing category', () => {
    let categoryStorage = new CategoryStorage();
    expect(true).to.equal(categoryStorage.add('Foo'), 'add first Foo category');
    expect(false).to.equal(categoryStorage.add('Foo'), 'try to add second Foo category');
  });
});