import Helper from './Helper.js';

describe('Category tag list model', () => {
  let getCategoryTagList = (tagsToAdd) => {
    let tagList = Helper.getTagList(tagsToAdd);
    let categoryTagList = Helper.getCategoryTagList();
    categoryTagList.addMany(tagList.get());
    return categoryTagList;
  };

  it('Add same tag twice times should increment counter', () => {
    let tagFoo = Helper.getTag('Foo');
    let categoryTagList = Helper.getCategoryTagList();
    categoryTagList.add(tagFoo.getTitle());
    categoryTagList.add(tagFoo.getTitle());
    expect(2).to.equal(categoryTagList.getCounterFor(tagFoo.getCode()));
  });

  it('Remove tag should decrement counter', () => {
    let tagFoo = Helper.getTag('Foo');
    let categoryTagList = Helper.getCategoryTagList();
    categoryTagList.add(tagFoo.getTitle());
    let tagBar = Helper.getTag('Bar');
    categoryTagList.add(tagBar.getTitle());
    categoryTagList.add(tagBar.getTitle());
    categoryTagList.remove(tagFoo.getTitle());
    categoryTagList.remove(tagBar.getTitle());
    expect(0).to.equal(categoryTagList.getCounterFor(tagFoo.getCode()), 'Amount of tag foo');
    expect(1).to.equal(categoryTagList.getCounterFor(tagBar.getCode()), 'Amount of tag bar');
  });

  it('Add many tags from tag list', () => {
    let categoryTagList = getCategoryTagList(['A', 'B', 'C']);
    expect(1).to.equal(categoryTagList.getCounterFor('a'));
    expect(1).to.equal(categoryTagList.getCounterFor('b'));
    expect(1).to.equal(categoryTagList.getCounterFor('c'));
  });

  it('Remove many tags from tag list', () => {
    let categoryTagList = getCategoryTagList(['A', 'B', 'C']);
    categoryTagList.add('A');
    let tagListToRemove = Helper.getTagList(['A', 'B']);
    categoryTagList.removeMany(tagListToRemove.get());
    expect(1).to.equal(categoryTagList.getCounterFor('a'));
    expect(0).to.equal(categoryTagList.getCounterFor('b'));
    expect(1).to.equal(categoryTagList.getCounterFor('c'));
  });

  it('Should return only tags its counter is higher than 0', () => {
    let categoryTagList = getCategoryTagList(['A', 'B', 'C']);
    categoryTagList.remove('A');
    expect(2).to.equal(categoryTagList.get().length);
  });

  it('Checks is category list contain specific tag', () => {
    let categoryTagList = getCategoryTagList(['A', 'B', 'C']);
    let tagA = Helper.getTag('A');
    expect(true).to.equal(categoryTagList.isInclude(tagA.getCode()), 'Tag should contain "A" tag');
    let tagB = Helper.getTag('B');
    categoryTagList.remove(tagB.getTitle());
    expect(false).to.equal(categoryTagList.isInclude(tagB.getCode()), 'Tag should not contain "B" tag');
  });

  it('Set category tag to the list', () => {
    let categoryTagFoo = Helper.getCategoryTag('Foo');
    categoryTagFoo.setCounter(1);
    let categoryTagList = Helper.getCategoryTagList();
    categoryTagList.set(categoryTagFoo);
    let categoryTagBar = Helper.getCategoryTag('Bar');
    categoryTagBar.setCounter(2);
    categoryTagList.set(categoryTagBar);
    let categoryTags = categoryTagList.get();
    expect(2).to.equal(categoryTags.length, 'Amount of tags category list');
    expect(1).to.equal(categoryTagList.getCounterFor(categoryTagFoo.getCode()), 'Counter for tag Foo');
    expect(2).to.equal(categoryTagList.getCounterFor(categoryTagBar.getCode()), 'Counter for tag Bar');
  });
});