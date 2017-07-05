import Category from '../../../../src/model/category/category.js'
import Note from '../../../../src/model/note/note.js'

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
});