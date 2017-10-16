import Tag from '../../../../src/model/tag/tag.js'
import TagList from '../../../../src/model/tag/list.js'
import CategoryTagList from '../../../../src/model/category/tagList.js'

describe('Category tag list model', () => {
  let getTag = (title) => {
    return new Tag({title: title});
  };

  it('Add same tag twice times should increment counter', () => {
    let tagFoo = getTag('Foo');
    let categoryTagList = new CategoryTagList();
    categoryTagList.add(tagFoo.getTitle());
    categoryTagList.add(tagFoo.getTitle());
    expect(2).to.equal(categoryTagList.getCounterFor(tagFoo.getCode()));
  });

  it('Remove tag should decrement counter', () => {
    let tagFoo = getTag('Foo');
    let categoryTagList = new CategoryTagList();
    categoryTagList.add(tagFoo.getTitle());
    let tagBar = getTag('Bar');
    categoryTagList.add(tagBar.getTitle());
    categoryTagList.add(tagBar.getTitle());
    categoryTagList.remove(tagFoo.getTitle());
    categoryTagList.remove(tagBar.getTitle());
    expect(0).to.equal(categoryTagList.getCounterFor(tagFoo.getCode()), 'Amount of tag foo');
    expect(1).to.equal(categoryTagList.getCounterFor(tagBar.getCode()), 'Amount of tag bar');
  });

  it('Add many tags from tag list', () => {
    let tagList = new TagList();
    tagList.add('A');
    tagList.add('B');
    tagList.add('C');
    let categoryTagList = new CategoryTagList();
    categoryTagList.addMany(tagList.get());
    expect(1).to.equal(categoryTagList.getCounterFor('a'));
    expect(1).to.equal(categoryTagList.getCounterFor('b'));
    expect(1).to.equal(categoryTagList.getCounterFor('c'));
  });

  it('Remove many tags from tag list', () => {
    let tagListToAdd = new TagList();
    tagListToAdd.add('A');
    tagListToAdd.add('B');
    tagListToAdd.add('C');
    let categoryTagList = new CategoryTagList();
    categoryTagList.addMany(tagListToAdd.get());
    categoryTagList.add('A');
    let tagListToRemove = new TagList();
    tagListToRemove.add('A');
    tagListToRemove.add('B');
    categoryTagList.removeMany(tagListToRemove.get());
    expect(1).to.equal(categoryTagList.getCounterFor('a'));
    expect(0).to.equal(categoryTagList.getCounterFor('b'));
    expect(1).to.equal(categoryTagList.getCounterFor('c'));
  });

  it('Should return only tags its counter is higher than 0', () => {
    let tagListToAdd = new TagList();
    tagListToAdd.add('A');
    tagListToAdd.add('B');
    tagListToAdd.add('C');
    let categoryTagList = new CategoryTagList();
    categoryTagList.addMany(tagListToAdd.get());
    categoryTagList.remove('A');
    expect(2).to.equal(categoryTagList.get().length);
  });
});