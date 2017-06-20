import TagList from '../../../../src/model/tag/list.js'

let getNonEmptyTagList = () => {
  let tagList = new TagList();
  tagList.add('Front end');
  return tagList;
};

it('Add new tag', () => {
  let tagList = getNonEmptyTagList();
  let addedTag = tagList.get()[0]; 
  expect('Front end').to.equal(addedTag.getTitle());
  expect('/tags/front-end').to.equal(addedTag.getUrl());
});

it('Find tag - founded', () => {
  let tagList = getNonEmptyTagList();
  let tagToFind = tagList.checkIsExist('Front end');
  expect('Front end').to.equal(tagToFind.getTitle());
  expect('/tags/front-end').to.equal(tagToFind.getUrl());
});

it('Find tag - not founded', () => {
  let tagList = getNonEmptyTagList();
  let tagToFind = tagList.checkIsExist('Foo');
  expect('').to.equal(tagToFind.getTitle());
  expect('').to.equal(tagToFind.getUrl());
});

it('Remove tag from list - success', () => {
  let tagList = getNonEmptyTagList();
  expect(true).to.equal(tagList.remove('Front end'));
});