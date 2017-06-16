import Category from '../../../../src/model/category/category.js'

describe('Category model', () => {
  it('Create empty category object', () => {
    let category = new Category();
    expect('').to.equal(category.getTitle(), 'empty title');
    expect('').to.equal(category.getCode(), 'empty code');
    expect('').to.equal(category.getUrl(), 'empty url');
  });

  it('Create category object with config data', () => {
    let category = new Category({ title: 'Python' });
    expect('Python').to.equal(category.getTitle(), 'Non-empty title');
    expect('python').to.equal(category.getCode(), 'Non-empty code');
    expect('/category/show/python').to.equal(category.getUrl(), 'Non-empty url');
  });

  it('getEmptyObject returns empty category object', () => {
    let category = new Category();
    let emptyObject = category.getEmptyObject();
    expect('').to.equal(emptyObject.title);
    expect('').to.equal(emptyObject.code);
    expect('').to.equal(emptyObject.url);
  });

  it('setTitle', () => {
    let category = new Category({ title: 'Java' });
    let newCategoryTitle = 'JavaScript';
    category.setTitle(newCategoryTitle);
    expect(newCategoryTitle).to.equal(category.getTitle());
  });
});