import Helper from './Helper.js';
import Note from '../../../../src/model/note/note.js'
import TagList from '../../../../src/model/tag/list.js'

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

  it('Add many tags from list tag', () => {
    let tagsList = new TagList();
    tagsList.add('A');
    tagsList.add('B');
    tagsList.add('C');

    let category = Helper.getCategory('Python');
    category.tags.addMany(tagsList.get());
    expect(tagsList.get().length).to.equal(category.tags.get().length);
  });

  it('Edit note', () => {
    let category = Helper.getCategory('Python');
    let note = new Note();
    note.setId(1);
    note.setTitle('Note 1');
    note.tags.add('A');
    note.tags.add('B');
    note.tags.add('C');
    category.addNote(note);
    expect(note.tags.get().length).to.equal(category.tags.get().length);

    let editedNote = new Note();
    editedNote.setId(note.getId());
    editedNote.setTitle('Note 1 - edited');
    editedNote.tags.set(note.tags.get());
    let tagsToRemove = new TagList();
    tagsToRemove.add('A');
    editedNote.tags.removeMany(tagsToRemove.get());
    let tagsToAdd = new TagList();
    tagsToAdd.add('D');
    tagsToAdd.add('E');
    editedNote.tags.addMany(tagsToAdd.get());
    let resultEdit = category.editNote(editedNote, tagsToAdd, tagsToRemove);
    expect(true).to.equal(resultEdit);
    let noteAfterEdit = category.notes.get(editedNote.getId());
    expect(category.tags.get().length).to.equal(noteAfterEdit.tags.get().length);
  });

  it('Remove note', () => {
    let category = Helper.getCategory('Python');
    let note = new Note();
    note.setId(1);
    note.setTitle('Note 1');
    note.tags.add('A');
    note.tags.add('B');
    note.tags.add('C');
    category.addNote(note);
    expect(1).to.equal(category.notes.getAll().length);
    expect(note.tags.get().length).to.equal(category.tags.get().length);
    let resultRemove = category.removeNote(note.getId());
    expect(true).to.equal(resultRemove);
    expect(0).to.equal(category.notes.getAll().length);
    expect(0).to.equal(category.tags.get().length);
  });
});