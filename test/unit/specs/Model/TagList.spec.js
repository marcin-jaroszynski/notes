import Helper from './Helper.js';

describe('Tag list model', () => {
  it('Add new tag', () => {
    let tagList = Helper.getTagList(['Front end']);
    let addedTag = tagList.get()[0]; 
    expect('Front end').to.equal(addedTag.getTitle());
    expect('/tags/front-end').to.equal(addedTag.getUrl());
  });

  it('Try to add the same tag', () => {
    let tagList = Helper.getTagList();
    expect(true).to.equal(tagList.add('Front end'));
    expect(false).to.equal(tagList.add('Front end'));
  });

  it('Try to add empty tag - should fail', () => {
    let tagList = Helper.getTagList();
    expect(false).to.equal(tagList.add(''));
  });

  it('Add many tags', () => {
    let tagList1 = Helper.getTagList(['A', 'B', 'C']);
    let tagList2 = Helper.getTagList(['D', 'E', 'A']);
    tagList2.addMany(tagList1.get());
    expect(5).to.equal(tagList2.get().length);
  });

  it('Remove tag', () => {
    let tagList = Helper.getTagList(['Front end', 'Grid']);
    expect(2).to.equal(tagList.get().length);
    expect(true).to.equal(tagList.remove('Front end'));
    expect(1).to.equal(tagList.get().length);
  });

  it('Set tags', () => {
    let tagList = Helper.getTagList(['A', 'B']);
    expect(2).to.equal(tagList.length());
    let tagListToSet = Helper.getTagList(['C', 'D', 'E']);
    tagList.set(tagListToSet.get());
    expect(3).to.equal(tagList.length());
  });

  it('Return difference between two tags list', () => {
    let tagsList1 = Helper.getTagList(['A', 'B', 'C']);
    let tagsList2 = Helper.getTagList(['A', 'C', 'D', 'E']);
    let comparedTags = tagsList1.compare(tagsList2);
    expect(Helper.getTagList(['D', 'E']).get()).to.deep.equal(comparedTags.toAdd.get(), 'Tags to add');
    expect(Helper.getTagList(['B']).get()).to.deep.equal(comparedTags.toRemove.get(), 'Tags to remove');
  });
});