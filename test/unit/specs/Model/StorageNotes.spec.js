import Note from '../../../../src/model/note/note.js'
import TagList from '../../../../src/model/tag/list.js'
import Storage from '../../../../src/model/storage/storage.js'
import CategoryNew from '../../../../src/model/category/category.js'

describe('Storage notes', () => {
  let getStorage = () => {
    return new Storage();
  };

  let getCategory = (title) => {
    return new CategoryNew({ title: title });
  };

  let getNote = (title, categoryId, tags) => {
    let note = new Note();
    note.setTitle(title);
    note.setContent(title +' - Content');
    note.setCategoryId(categoryId);
    note.tags.addMany(tags.get());
    return note;
  };

  it('Add one note', () => {
    let storage = getStorage();
    let category = getCategory('Foo');
    storage.categories.add(category.getTitle());
    let noteTags = new TagList();
    noteTags.add('A');
    noteTags.add('B');
    noteTags.add('C');
    let noteToAdd = getNote('Note 1', category.getCode(), noteTags);
    let result = storage.notes.add(noteToAdd);
    expect(true).to.equal(result);
    let categoryToFind = storage.categories.get(category.getCode());
    expect(1).to.equal(categoryToFind.notes.getAll().length);
    expect(3).to.equal(noteToAdd.tags.get().length, 'Count of note tags');
    expect(3).to.equal(categoryToFind.tags.get().length, 'Count of category tags');
    expect(1).to.equal(storage.dashboard.length());
    let topNoteInDashboard = storage.dashboard.peek();
    expect(noteToAdd.getTitle()).to.equal(topNoteInDashboard.getNoteTitle());
  });

  it('Add two notes with many tags', () => {
    let storage = getStorage();
    let category = getCategory('Foo');
    storage.categories.add(category.getTitle());

    let note1Tags = new TagList();
    note1Tags.add('A');
    note1Tags.add('B');
    note1Tags.add('C');
    let note1ToAdd = getNote('Note 1', category.getCode(), note1Tags);
    storage.notes.add(note1ToAdd);

    expect(1).to.equal(storage.dashboard.length());
    let topNoteInDashboard = storage.dashboard.peek();
    expect(note1ToAdd.getTitle()).to.equal(topNoteInDashboard.getNoteTitle(), 'First note added is on top in dashobard');
    
    let categoryToFind = storage.categories.get(category.getCode());
    expect(note1ToAdd.tags.get().length).to.equal(categoryToFind.tags.get().length);
    
    let note2Tags = new TagList();
    note2Tags.add('D');
    note2Tags.add('E');
    note2Tags.add('A');
    let note2ToAdd = getNote('Note 2', category.getCode(), note2Tags);
    storage.notes.add(note2ToAdd);

    expect(5).to.equal(categoryToFind.tags.get().length);
    expect(2).to.equal(storage.dashboard.length());
    topNoteInDashboard = storage.dashboard.peek();
    expect(note2ToAdd.getTitle()).to.equal(topNoteInDashboard.getNoteTitle(), 'Second note added is on top in dashobard');
  });

  it('Try to get non-exisiting note - should return empty note object', () => {
    let storage = getStorage();
    let nonExistingNote = storage.notes.get('non-existing-note-id');
    expect(0).to.equal(nonExistingNote.getId());
    expect('').to.equal(nonExistingNote.getCategoryId());
    expect('').to.equal(nonExistingNote.getTitle());
    expect('').to.equal(nonExistingNote.getContent());
    expect('').to.equal(nonExistingNote.getUrl());
  });

  it('Remove note', () => {
    let storage = getStorage();
    let category = getCategory('Foo');
    storage.categories.add(category.getTitle());

    let note1Tags = new TagList();
    note1Tags.add('A');
    note1Tags.add('B');
    note1Tags.add('C');
    let note1 = getNote('Note 1', category.getCode(), note1Tags);
    let resultNote1Add = storage.notes.add(note1);
    expect(true).to.equal(resultNote1Add);

    let note2Tags = new TagList();
    note2Tags.add('D');
    note2Tags.add('E');
    let note2 = getNote('Note 2', category.getCode(), note2Tags);
    let resultNote2Add = storage.notes.add(note2);
    expect(true).to.equal(resultNote2Add);

    let categoryWithNotes = storage.categories.get(category.getCode());
    expect(2).to.equal(categoryWithNotes.notes.getAll().length);
    expect(5).to.equal(categoryWithNotes.tags.get().length);

    let resultRemove = storage.notes.remove(note2.getId());
    expect(true).to.equal(resultRemove, 'Result of remove note');
    expect(1).to.equal(categoryWithNotes.notes.getAll().length);
    expect(note1.tags.get().length).to.equal(categoryWithNotes.tags.get().length);
  });

  it('Remove note - given non-existing id', () => {
    let storage = getStorage();
    let category = getCategory('Foo');
    storage.categories.add(category.getTitle());

    let note1Tags = new TagList();
    note1Tags.add('A');
    note1Tags.add('B');
    note1Tags.add('C');
    let note1 = getNote('Note 1', category.getCode(), note1Tags);
    let resultNote1Add = storage.notes.add(note1);
    expect(true).to.equal(resultNote1Add);

    let note2Tags = new TagList();
    note2Tags.add('D');
    note2Tags.add('E');
    let note2 = getNote('Note 2', category.getCode(), note2Tags);
    let resultNote2Add = storage.notes.add(note2);
    expect(true).to.equal(resultNote2Add);

    let categoryWithNotes = storage.categories.get(category.getCode());
    expect(2).to.equal(categoryWithNotes.notes.getAll().length);
    expect(5).to.equal(categoryWithNotes.tags.get().length);

    let resultRemove = storage.notes.remove('non-existing-note-id');
    expect(false).to.equal(resultRemove);
    expect(2).to.equal(categoryWithNotes.notes.getAll().length);
    expect(5).to.equal(categoryWithNotes.tags.get().length);
  });

  it('Update note and category tags', () => {
    let storage = getStorage();
    let category = getCategory('Foo');
    storage.categories.add(category.getTitle());

    let note1Tags = new TagList();
    note1Tags.add('A');
    note1Tags.add('B');
    note1Tags.add('C');
    let note1 = getNote('Note 1', category.getCode(), note1Tags);
    storage.notes.add(note1);

    let noteToEdit = getNote('Note 1 edited', category.getCode(), note1Tags);
    noteToEdit.setId(note1.getId());

    let tagsToAdd = new TagList();
    tagsToAdd.add('D');
    tagsToAdd.add('E');
    noteToEdit.tags.addMany(tagsToAdd.get());

    let tagsToRemove = new TagList();
    tagsToRemove.add('B');
    noteToEdit.tags.removeMany(tagsToRemove.get());

    let editNoteResult = storage.notes.edit(noteToEdit, tagsToAdd, tagsToRemove);
    expect(true).to.equal(editNoteResult);

    let noteAfterEdit = storage.notes.get(noteToEdit.getId());
    expect(noteToEdit.getTitle()).to.equal(noteAfterEdit.getTitle());
    expect(noteToEdit.getContent()).to.equal(noteAfterEdit.getContent());
    expect(4).to.equal(noteAfterEdit.tags.get().length);
    let categoryWithEditedNote = storage.categories.get(category.getCode());
    expect(4).to.equal(categoryWithEditedNote.tags.get().length);
  });

  it('Change note category', () => {
    let storage = getStorage();
    let categoryFoo = getCategory('Foo');
    storage.categories.add(categoryFoo.getTitle());

    let note1Tags = new TagList();
    note1Tags.add('A');
    note1Tags.add('B');
    note1Tags.add('C');
    let note1 = getNote('Note 1', categoryFoo.getCode(), note1Tags);
    storage.notes.add(note1);

    let categoryBar = getCategory('Bar');
    storage.categories.add(categoryBar.getTitle());

    expect(2).to.equal(storage.categories.getAll().length, 'Amount of categories');

    let noteToEdit = getNote('Note 1 edited', categoryBar.getCode(), note1Tags);
    noteToEdit.setId(note1.getId());

    let tagsToAdd = new TagList();
    tagsToAdd.add('D');
    tagsToAdd.add('E');
    noteToEdit.tags.addMany(tagsToAdd.get());

    let tagsToRemove = new TagList();
    tagsToRemove.add('B');
    noteToEdit.tags.removeMany(tagsToRemove.get());

    let editNoteResult = storage.notes.edit(noteToEdit, tagsToAdd, tagsToRemove)
    expect(true).to.equal(editNoteResult);

    let categoryWithMovedNote = storage.categories.get(noteToEdit.getCategoryId()); 
    expect(1).to.equal(categoryWithMovedNote.notes.getAll().length);

    let noteAfterEdit = storage.notes.get(noteToEdit.getId());
    expect(categoryBar.getCode()).to.equal(noteAfterEdit.getCategoryId());
    expect(noteToEdit.getTitle()).to.equal(noteAfterEdit.getTitle());
    expect(noteToEdit.getContent()).to.equal(noteAfterEdit.getContent());
    expect(noteToEdit.tags.get().length).to.equal(noteAfterEdit.tags.get().length);
    let categoryWithEditedNote = storage.categories.get(categoryBar.getCode());
    expect(noteAfterEdit.tags.get().length).to.equal(categoryWithEditedNote.tags.get().length);
  });

  it('Edit note - for non-existing category - failure', () => {
    let storage = getStorage();
    let category = getCategory('Foo');
    storage.categories.add(category.getTitle());

    let note1Tags = new TagList();
    note1Tags.add('A');
    note1Tags.add('B');
    note1Tags.add('C');
    let note1 = getNote('Note 1', category.getCode(), note1Tags);
    storage.notes.add(note1);

    let nonExistingCategoryCode = 'non-existing-category-code';
    let noteToEdit = getNote('Note 1 edited', nonExistingCategoryCode, note1Tags);
    noteToEdit.setId(note1.getId());

    let tagsToAdd = new TagList();
    tagsToAdd.add('D');
    tagsToAdd.add('E');
    noteToEdit.tags.addMany(tagsToAdd.get());

    let tagsToRemove = new TagList();
    tagsToRemove.add('B');
    noteToEdit.tags.removeMany(tagsToRemove.get());

    let editNoteResult = storage.notes.edit(noteToEdit, tagsToAdd, tagsToRemove);
    expect(false).to.equal(editNoteResult, 'Result edit');
    let noteAfterEdit = storage.notes.get(noteToEdit.getId());
    expect(category.getCode()).to.equal(noteAfterEdit.getCategoryId());
    expect(note1.getTitle()).to.equal(noteAfterEdit.getTitle());
    expect(note1.getContent()).to.equal(noteAfterEdit.getContent());
    expect(note1.tags.get().length).to.equal(noteAfterEdit.tags.get().length);
    let nonExistingCategory = storage.categories.get(nonExistingCategoryCode);
    expect(0).to.equal(nonExistingCategory.tags.get().length);
  });
});