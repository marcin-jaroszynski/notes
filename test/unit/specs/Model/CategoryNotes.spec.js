import Tags from '../../../../src/model/category/tags.js'
import Note from '../../../../src/model/note/note.js'
import CategoryNotes from '../../../../src/model/category/notes.js'
import Category from '../../../../src/model/category/category.js'

describe('Category Notes model', () => {
  let getNote = (titleNote, categoryCode) => {
    let note = new Note();
    note.setId(1);
    note.setTitle(titleNote);
    note.setCategoryId(categoryCode);
    note.tags.add('A');
    note.tags.add('B');
    return note;
  };

  let getNonEmptyCategoryNotes = () => {
    let categoryNotes = new CategoryNotes();  
    let fooCategory = getCategory('Foo');
    categoryNotes.add(getNote('Note 1', fooCategory.getCode()));
    return categoryNotes;
  };

  let getCategory = (title) => {
    return new Category({ title: title });
  };

  it('Add note', () => {
    let categoryNotes = getNonEmptyCategoryNotes();
    let fooCategory = getCategory('Foo');
    let note = getNote('Note 1', fooCategory.getCode());
    let addedNote = categoryNotes.get(note.getId());
    expect(note.getId()).to.equal(addedNote.getId());
    expect(note.getTitle()).to.equal(addedNote.getTitle());
    expect(note.getCategoryId()).to.equal(addedNote.getCategoryId());
  });

  it('Edit note', () => {
    let categoryNotes = getNonEmptyCategoryNotes();
    let fooCategory = getCategory('Foo');
    let note = getNote('Note 2', fooCategory.getCode());
    let editedNote = new Note();
    editedNote.setId(note.getId());
    editedNote.setTitle('Note 1 - edited');
    editedNote.tags.addMany(note.tags.get());
    editedNote.tags.remove('B');
    let resultEdit = categoryNotes.edit(editedNote);
    expect(true).to.equal(resultEdit);
    let currentNote = categoryNotes.get(editedNote.getId());
    expect(currentNote.getTitle()).to.equal(editedNote.getTitle());
  });

  it('Remove note - success', () => {
    let categoryNotes = getNonEmptyCategoryNotes();
    expect(1).to.equal(categoryNotes.getAll().length);
    let fooCategory = getCategory('Foo');
    let addedNote = getNote('Note 2', fooCategory.getCode());
    let resultRemove = categoryNotes.remove(addedNote.getId());
    expect(true).to.equal(resultRemove);
    expect(0).to.equal(categoryNotes.getAll().length);
  });

  it('Remove note - failure non-existing note', () => {
    let categoryNotes = getNonEmptyCategoryNotes();
    expect(1).to.equal(categoryNotes.getAll().length);
    let fooCategory = getCategory('Foo');
    let addedNote = getNote('Note 2', fooCategory.getCode());
    let resultRemove = categoryNotes.remove(123456);
    expect(false).to.equal(resultRemove);
    expect(1).to.equal(categoryNotes.getAll().length);
  });

  it('Update category id of all notes', () => {
    let categoryNotes = getNonEmptyCategoryNotes();
    let fooCategory = getCategory('Foo');
    let note2 = getNote('Note 2', fooCategory.getCode());
    categoryNotes.add(note2);
    expect(2).to.equal(categoryNotes.getAll().length);
    let barCategory = getCategory('Bar');
    categoryNotes.updateAllCategoryId(barCategory.getCode());
    let amountOfUpdatedNotesCategoryId = 0;
    let notes = categoryNotes.getAll();
    for (let i = 0; i < notes.length; i++) {
        if (barCategory.getCode() == notes[i].categoryId) {
            amountOfUpdatedNotesCategoryId++;
        }
    }
    expect(2).to.equal(amountOfUpdatedNotesCategoryId);
  });
});