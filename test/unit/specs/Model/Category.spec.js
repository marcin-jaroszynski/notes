import Category from '../../../../src/model/category/category.js'

describe('Category model', () => {
  it('Create category object with config data', () => {
    let category = new Category({ title: 'Python' });
    expect('Python').to.equal(category.getTitle(), 'Non-empty title');
    expect('python').to.equal(category.getCode(), 'Non-empty code');
    expect('/category/show/python').to.equal(category.getUrl(), 'Non-empty url');
  });

  it('setTitle', () => {
    let category = new Category({ title: 'Java' });
    let newCategoryTitle = 'JavaScript';
    category.setTitle(newCategoryTitle);
    expect(newCategoryTitle).to.equal(category.getTitle());
  });
});