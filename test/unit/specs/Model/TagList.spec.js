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

  it('Try to add the same tag', () => {
    let tagList = new TagList();
    expect(true).to.equal(tagList.add('Front end'));
    expect(false).to.equal(tagList.add('Front end'));
  });

  it('Add many tags', () => {
    let tagList1 = new TagList();
    tagList1.add('A');
    tagList1.add('B');
    tagList1.add('C');

    let tagList2 = new TagList();
    tagList2.add('D');
    tagList2.add('E');
    tagList2.add('A');
    tagList2.addMany(tagList1.get());
    expect(5).to.equal(tagList2.get().length);
  });

  it('Remove tag', () => {
    let tagList = new TagList();
    tagList.add('Front end');
    tagList.add('Grid');
    expect(2).to.equal(tagList.get().length);
    expect(true).to.equal(tagList.remove('Front end'));
    expect(1).to.equal(tagList.get().length);
  });
});