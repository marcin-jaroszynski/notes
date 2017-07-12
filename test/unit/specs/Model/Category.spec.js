import Category from '../../../../src/model/category/category.js'
import Note from '../../../../src/model/note/note.js'
import TagList from '../../../../src/model/tag/list.js'

describe('Category model', () => {
  let getCategory = () => {
    return new Category({ title: 'Python' });
  };

  it('Create category object with config data', () => {
    let category = getCategory();
    expect('Python').to.equal(category.getTitle(), 'Non-empty title');
    expect('python').to.equal(category.getCode(), 'Non-empty code');
    expect('/category/show/python').to.equal(category.getUrl(), 'Non-empty url');
  });

  it('setTitle', () => {
    let category = getCategory();
    let newCategoryTitle = 'JavaScript';
    category.setTitle(newCategoryTitle);
    expect(newCategoryTitle).to.equal(category.getTitle());
  });

  it('addNote', () => {
    let category = getCategory();
    let note = new Note();
    note.setTitle('Note 1');
    category.addNote(note);
    let addedNote = category.getNotes()[0];
    expect(category.getCode()).to.equal(addedNote.getCategoryId());
  });

  it('Add few notes with many tags', () => {
    let category = getCategory();

    let note1 = new Note();
    note1.setTitle('Note 1');
    note1.addTag('A');
    note1.addTag('B');
    note1.addTag('C');
    category.addNote(note1);
    
    expect(3).to.equal(category.getTags().length);

    let note2 = new Note();
    note2.setTitle('Note 2');
    note2.addTag('D');
    note2.addTag('E');
    note2.addTag('A');
    category.addNote(note2);

    expect(5).to.equal(category.getTags().length);
  });

  it('Add many tags from list tag', () => {
    let tagsList = new TagList();
    tagsList.add('A');
    tagsList.add('B');
    tagsList.add('C');

    let category = getCategory();
    category.addTags(tagsList.get());
    expect(tagsList.get().length).to.equal(category.getTags().length);
  });

  it('Remove note', () => {
    let category = getCategory();
    let note = new Note();
    note.setTitle('Note 1');
    category.addNote(note);
    expect(1).to.equal(category.getNotes().length);
    let resultRemove = category.removeNote(1);
    expect(true).to.equal(resultRemove);
    expect(0).to.equal(category.getNotes().length);
  });
});