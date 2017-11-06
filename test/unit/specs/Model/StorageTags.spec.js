import Storage from '../../../../src/model/storage/storage.js'
import Category from '../../../../src/model/category/category.js'
import TagList from '../../../../src/model/tag/list.js'
import Tag from '../../../../src/model/tag/tag.js'
import Note from '../../../../src/model/note/note.js'

describe('Storage tags', () => {
  let getCategory = (title) => {
    return new Category({ title: title });
  };

  let getNote = (title, categoryId, tags) => {
    let note = new Note();
    note.setTitle(title);
    note.setContent(title +' - Content');
    note.setCategoryId(categoryId);
    note.tags.addMany(tags.get());
    return note;
  }; 

  let getTag = (title) => {
    return new Tag({title: title});
  };

  let getTagList = (tags) => {
    let tagList = new TagList();
    for (let i = 0; i < tags.length; i++) {
      tagList.add(tags[i]);
    }
    return tagList;
  };

  it('Return specific tag', () => {
    let tagFoo = getTag('Foo');
    let category = getCategory('JavaScript');
    let note = getNote('Note 1', 1, getTagList(['Bar', tagFoo.getTitle()]));
    category.addNote(note);
    let storage = new Storage();
    storage.categories.add(category);
    let tagToFind = storage.tags.tag(tagFoo.getCode());
    expect(tagFoo.getTitle()).to.equal(tagToFind.getTitle(), 'Foo tag');
  });
});