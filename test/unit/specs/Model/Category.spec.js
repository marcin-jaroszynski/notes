import Helper from './Helper.js';

describe('Category model', () => {
  it('Create category object with config data', () => {
    let category = Helper.getCategory('Python');
    expect('Python').to.equal(category.getTitle(), 'Non-empty title');
    expect('python').to.equal(category.getCode(), 'Non-empty code');
    expect('/category/show/python').to.equal(category.getUrl(), 'Non-empty url');
  }); 

  it('setTitle', () => {
    let category = Helper.getCategory('Python');
    let newCategoryTitle = 'JavaScript';
    category.setTitle(newCategoryTitle);
    expect(newCategoryTitle).to.equal(category.getTitle());
  });

  it('Add note with tags to category', () => {
    let tagsNote = ['A', 'B', 'C'];
    let note = Helper.getNote('Note 1', tagsNote);
    let category = Helper.getCategory('Python');
    category.addNote(note);
    expect(tagsNote.length).to.equal(category.getTags().length);
  });

  it('Edit note', () => {
    let category = Helper.getCategory('Python');
    let note = Helper.getNote('Note 1', ['A', 'B', 'C']);
    note.setId(1);
    category.addNote(note);
    expect(note.tags.get().length).to.equal(category.getTags().length);
    let editedNote = Helper.getNote('Note 1 - edited');
    editedNote.setId(note.getId());
    editedNote.tags.set(note.tags.get());
    let tagsToRemove = Helper.getTagList(['A']);
    let tagsToAdd = Helper.getTagList(['D', 'E']);
    let resultEdit = category.editNote(editedNote, tagsToAdd, tagsToRemove);
    expect(true).to.equal(resultEdit);
    let noteAfterEdit = category.notes.get(editedNote.getId());
    expect(category.getTags().length).to.equal(noteAfterEdit.tags.get().length);
  });

  it('Remove note', () => {
    let category = Helper.getCategory('Python');
    let note = Helper.getNote('Note 1', ['A', 'B', 'C']);
    note.setId(1);
    category.addNote(note);
    expect(1).to.equal(category.notes.getAll().length);
    expect(note.tags.get().length).to.equal(category.getTags().length);
    let resultRemove = category.removeNote(note.getId());
    expect(true).to.equal(resultRemove);
    expect(0).to.equal(category.notes.getAll().length);
    expect(0).to.equal(category.getTags().length);
  });
});