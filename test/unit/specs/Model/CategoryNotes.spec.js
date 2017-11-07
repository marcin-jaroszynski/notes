import Helper from './Helper.js';
import CategoryNotes from '../../../../src/model/category/notes.js'

describe('Category Notes model', () => {
  let getNonEmptyCategoryNotes = (note) => {
    let categoryNotes = new CategoryNotes();
    categoryNotes.add(note);
    return categoryNotes;
  };

  it('Add note', () => {
    let note = Helper.getNote('Note 1');
    let categoryNotes = getNonEmptyCategoryNotes(note);
    let addedNote = categoryNotes.get(note.getId());
    expect(note.getId()).to.equal(addedNote.getId());
    expect(note.getTitle()).to.equal(addedNote.getTitle());
    expect(note.getCategoryId()).to.equal(addedNote.getCategoryId());
  });

  it('Edit note', () => {
    let note1 = Helper.getNote('Note 1', ['A', 'B']);
    note1.setId(1);
    let categoryNotes = getNonEmptyCategoryNotes(note1);
    let editedNote = Helper.getNote('Note 1');
    editedNote.setId(note1.getId());
    editedNote.setTitle('Note 1 - edited');
    editedNote.tags.addMany(note1.tags.get());
    editedNote.tags.remove('B');
    let resultEdit = categoryNotes.edit(editedNote);
    expect(true).to.equal(resultEdit);
    let currentNote = categoryNotes.get(editedNote.getId());
    expect(currentNote.getTitle()).to.equal(editedNote.getTitle());
  });

  it('Remove note - success', () => {
    let note = Helper.getNote('Note 1');
    let categoryNotes = getNonEmptyCategoryNotes(note);
    expect(1).to.equal(categoryNotes.getAll().length);
    let addedNote = Helper.getNote('Note 2');
    let resultRemove = categoryNotes.remove(addedNote.getId());
    expect(true).to.equal(resultRemove);
    expect(0).to.equal(categoryNotes.getAll().length);
  });

  it('Remove note - failure non-existing note', () => {
    let note = Helper.getNote('Note 1');
    let categoryNotes = getNonEmptyCategoryNotes(note);
    expect(1).to.equal(categoryNotes.getAll().length);
    let addedNote = Helper.getNote('Note 2');
    let resultRemove = categoryNotes.remove(123456);
    expect(false).to.equal(resultRemove);
    expect(1).to.equal(categoryNotes.getAll().length);
  });

  it('Update category id of all notes', () => {
    let note = Helper.getNote('Note 1');
    let categoryNotes = getNonEmptyCategoryNotes(note);
    let fooCategory = Helper.getCategory('Foo');
    let note2 = Helper.getNote('Note 2');
    categoryNotes.add(note2);
    expect(2).to.equal(categoryNotes.getAll().length);
    let barCategory = Helper.getCategory('Bar');
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