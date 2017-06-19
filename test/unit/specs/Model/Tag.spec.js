import Tag from '../../../../src/model/tag/tag.js'

it('Create empty object', () => {
  let emptyTag = new Tag();
  expect('').to.equal(emptyTag.getTitle());
  expect('').to.equal(emptyTag.getUrl());
});

it('Create not empty object', () => {
  let tag = new Tag({title: 'Front end'});
  expect('Front end').to.equal(tag.getTitle());
  expect('/tags/front-end').to.equal(tag.getUrl());
});