import CategoryModel from '../../../src/model/category.js'

describe('CategoryModel tests', () => {
  let categoryModel = new CategoryModel();
  it('getTitleFor should return valid title of category', () => {
    expect('JavaScript').to.equal(categoryModel.getTitleFor('javascript'));
  });

  it('getTitleFor should return title category as "undefined" string for invalid code category', () => {
    expect('undefined').to.equal(categoryModel.getTitleFor('whaaat'));
  });
})