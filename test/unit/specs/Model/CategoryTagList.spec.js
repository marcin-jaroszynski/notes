import Tag from '../../../../src/model/tag/tag.js'
import CategoryTagList from '../../../../src/model/category/tagList.js'

describe('Category tag list model', () => {
  let getTag = (title) => {
    return new Tag({title: title});
  };

  it('Add same tag two times should increment counter', () => {
    let tagFoo = getTag('Foo');
    let categoryTagList = new CategoryTagList();
    categoryTagList.add(tagFoo.getTitle());
    categoryTagList.add(tagFoo.getTitle());
    let categoryTags = categoryTagList.get();
    expect(2).to.equal(categoryTags[tagFoo.getCode()]);
  });
});