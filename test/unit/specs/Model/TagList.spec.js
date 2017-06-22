import TagList from '../../../../src/model/tag/list.js'

describe('Tag list model', () => {
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
});