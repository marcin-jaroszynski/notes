import Tags from '../../../../src/model/category/tags.js'
import Note from '../../../../src/model/note/note.js'
import CategoryNotes from '../../../../src/model/category/notes.js'

describe('Category Notes model', () => {
  let getNote = () => {
    let note = new Note();
    note.setId(1);
    note.setTitle('Note 1');
    note.tags.add('A');
    note.tags.add('B');
    return note;
  };

  let getNonEmptyCategoryNotes = () => {
    let categoryNotes = new CategoryNotes();  
    categoryNotes.add(getNote());
    return categoryNotes;
  };

  it('Add note', () => {
    let categoryNotes = getNonEmptyCategoryNotes();
    let note = getNote();
    let addedNote = categoryNotes.get(note.getId());
    expect(note.getId()).to.equal(addedNote.getId());
    expect(note.getTitle()).to.equal(addedNote.getTitle());
    expect(note.getCategoryId()).to.equal(addedNote.getCategoryId());
  });

  it('Edit note', () => {
    let categoryNotes = getNonEmptyCategoryNotes();
    let note = getNote();
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
    let addedNote = getNote();
    let resultRemove = categoryNotes.remove(addedNote.getId());
    expect(true).to.equal(resultRemove);
    expect(0).to.equal(categoryNotes.getAll().length);
  });

  it('Remove note - failure non-existing note', () => {
    let categoryNotes = getNonEmptyCategoryNotes();
    expect(1).to.equal(categoryNotes.getAll().length);
    let addedNote = getNote();
    let resultRemove = categoryNotes.remove(123456);
    expect(false).to.equal(resultRemove);
    expect(1).to.equal(categoryNotes.getAll().length);
  });
});