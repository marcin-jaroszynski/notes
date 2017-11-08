import Helper from './Helper.js';
import Note from '../../../../src/model/note/note.js'
import TagList from '../../../../src/model/tag/list.js'

describe('Storage notes', () => {

  let getNote = (title, categoryId, tags) => {
    let note = new Note();
    note.setTitle(title);
    note.setContent(title +' - Content');
    note.setCategoryId(categoryId);
    note.tags.addMany(tags.get());
    return note;
  };

  it('Add one note', () => {
    let storage = Helper.getStorage();
    let category = Helper.getCategory('Foo');
    storage.categories.add(category);
    let noteToAdd = Helper.getNote('Note 1', ['A', 'B', 'C']);
    noteToAdd.setCategoryId(category.getCode());
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
    let storage = Helper.getStorage();
    let category = Helper.getCategory('Foo');
    storage.categories.add(category);

    let note1ToAdd = Helper.getNote('Note 1', ['A', 'B', 'C']);
    note1ToAdd.setCategoryId(category.getCode());
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
    let note2ToAdd = Helper.getNote('Note 2', ['D', 'E', 'A']);
    note2ToAdd.setCategoryId(category.getCode());
    storage.notes.add(note2ToAdd);

    expect(5).to.equal(categoryToFind.tags.get().length);
    expect(2).to.equal(storage.dashboard.length());
    topNoteInDashboard = storage.dashboard.peek();
    expect(note2ToAdd.getTitle()).to.equal(topNoteInDashboard.getNoteTitle(), 'Second note added is on top in dashobard');
  });

  it('Try to get non-exisiting note - should return empty note object', () => {
    let storage = Helper.getStorage();
    let nonExistingNote = storage.notes.get('non-existing-note-id');
    expect(0).to.equal(nonExistingNote.getId());
    expect('').to.equal(nonExistingNote.getCategoryId());
    expect('').to.equal(nonExistingNote.getTitle());
    expect('').to.equal(nonExistingNote.getContent());
    expect('').to.equal(nonExistingNote.getUrl());
  });

  it('Remove note', () => {
    let storage = Helper.getStorage();
    let category = Helper.getCategory('Foo');
    storage.categories.add(category);

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

    let dashboardItems = storage.dashboard.get();
    expect(2).to.equal(dashboardItems.length);

    let categoryWithNotes = storage.categories.get(category.getCode());
    expect(2).to.equal(categoryWithNotes.notes.getAll().length);
    expect(5).to.equal(categoryWithNotes.tags.get().length);

    let resultRemove = storage.notes.remove(note2.getId());
    expect(true).to.equal(resultRemove, 'Result of remove note');
    expect(1).to.equal(categoryWithNotes.notes.getAll().length);
    expect(note1.tags.get().length).to.equal(categoryWithNotes.tags.get().length);
    expect(1).to.equal(dashboardItems.length);
  });

  it('Remove note - given non-existing id', () => {
    let storage = Helper.getStorage();
    let category = Helper.getCategory('Foo');
    storage.categories.add(category);

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
    let storage = Helper.getStorage();
    let category = Helper.getCategory('Foo');
    storage.categories.add(category);

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

    let dashboardItems = storage.dashboard.get();
    let isDashboardItemUpdated = false;
    for (let i = 0; i < dashboardItems.length; i++) {
        if (dashboardItems[i].getNoteId() == noteToEdit.getId() && 
            dashboardItems[i].getNoteTitle() == noteToEdit.getTitle()) {
            isDashboardItemUpdated = true;
        }
    }
    expect(true).to.equal(isDashboardItemUpdated);

    let noteAfterEdit = storage.notes.get(noteToEdit.getId());
    expect(noteToEdit.getTitle()).to.equal(noteAfterEdit.getTitle());
    expect(noteToEdit.getContent()).to.equal(noteAfterEdit.getContent());
    expect(4).to.equal(noteAfterEdit.tags.get().length);
    let categoryWithEditedNote = storage.categories.get(category.getCode());
    expect(4).to.equal(categoryWithEditedNote.tags.get().length);
  });

  it('Change note category', () => {
    let storage = Helper.getStorage();
    let categoryFoo = Helper.getCategory('Foo');
    storage.categories.add(categoryFoo);

    let note1Tags = new TagList();
    note1Tags.add('A');
    note1Tags.add('B');
    note1Tags.add('C');
    let note1 = getNote('Note 1', categoryFoo.getCode(), note1Tags);
    storage.notes.add(note1);

    let categoryBar = Helper.getCategory('Bar');
    storage.categories.add(categoryBar);

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

    let dashboardItems = storage.dashboard.get();
    let isDashboardItemCategoryUpdated = false;
    for (let i = 0; i < dashboardItems.length; i++) {
        if (dashboardItems[i].getNoteId() == noteToEdit.getId() && 
            dashboardItems[i].getCategoryTitle() == categoryBar.getTitle()) {
            isDashboardItemCategoryUpdated = true;
        }
    }
    expect(true).to.equal(isDashboardItemCategoryUpdated);

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
    let storage = Helper.getStorage();
    let category = Helper.getCategory('Foo');
    storage.categories.add(category);

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

  it('Change title category should change category code in all notes of edited category', () => {
    let categoryFoo = Helper.getCategory('Foo');
    let storage = Helper.getStorage();
    storage.categories.add(categoryFoo);

    let note1Tags = new TagList();
    note1Tags.add('A');
    let note1ToAdd = getNote('Note 1', categoryFoo.getCode(), note1Tags);
    storage.notes.add(note1ToAdd);

    let note2Tags = new TagList();
    note2Tags.add('B');
    let note2ToAdd = getNote('Note 2', categoryFoo.getCode(), note2Tags);
    storage.notes.add(note2ToAdd);

    let notesCategoryFoo = storage.categories.getNotesFor(categoryFoo.getCode());
    expect(2).to.equal(notesCategoryFoo.length, 'Amount of notes added to Foo category');

    let categoryBar = new Helper.getCategory('Bar');
    storage.categories.changeTitle(categoryFoo.getTitle(), categoryBar.getTitle());
    
    let notesCategoryFooAfterTitleChanged = storage.categories.getNotesFor(categoryFoo.getCode());
    expect(0).to.equal(notesCategoryFooAfterTitleChanged.length, 'Amount of notes Foo category after title changed');

    let notesOfBarCategory = storage.categories.getNotesFor(categoryBar.getCode());
    expect(2).to.equal(notesOfBarCategory.length, 'Amount of notes Bar category after title changed of Foo category');

    let amountOfUpdatedNotesCategoryId = 0;
    for (let i = 0; i < notesOfBarCategory.length; i++) {
        if (categoryBar.getCode() == notesOfBarCategory[i].categoryId) {
            amountOfUpdatedNotesCategoryId++;
        }
    }
    expect(2).to.equal(amountOfUpdatedNotesCategoryId, 'Amount of notes updated their category id');

    let dashboardItems = storage.dashboard.get();
    let counterUpdatedItemsInDashboard = 0;
    for (let i = 0; i < dashboardItems.length; i++) {
        if (dashboardItems[i].getCategoryTitle() == categoryBar.getTitle()) {
            counterUpdatedItemsInDashboard++;
        }
    }
    expect(notesOfBarCategory.length).to.equal(counterUpdatedItemsInDashboard);
  });
});