import Tag from '../../../../src/model/tag/tag.js'

describe('Tag model', () => {
  it('Create not empty object', () => {
    let tag = new Tag({title: 'Front end'});
    expect('Front end').to.equal(tag.getTitle());
    expect('/tags/front-end').to.equal(tag.getUrl());
  });
});