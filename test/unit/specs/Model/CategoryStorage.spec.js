import CategoryStorage from '../../../../src/model/category/storage.js'
import Note from '../../../../src/model/note/note.js'
import TagList from '../../../../src/model/tag/list.js'

describe('CategoryStorage', () => {
  it('add non-existing category', () => {
    let categoryStorage = new CategoryStorage();
    expect(true).to.equal(categoryStorage.add('Foo'));
  });

  it('try to add existing category', () => {
    let categoryStorage = new CategoryStorage();
    expect(true).to.equal(categoryStorage.add('Foo'), 'add first Foo category');
    expect(false).to.equal(categoryStorage.add('Foo'), 'try to add second Foo category');
  });

  it('update note and category tags', () => {
    let categoryStorage = new CategoryStorage();
    categoryStorage.add('Linux');
    let note1 = new Note();
    note1.setTitle('Note 1');
    note1.setContent('Lorem ipsum');
    note1.setCategoryId('linux');
    note1.addTag('A');
    note1.addTag('B');
    note1.addTag('C');
    categoryStorage.addNote(note1);
 
    let currentCategory = categoryStorage.getFor(note1.getCategoryId());
    expect(1).to.equal(currentCategory.getNotes().length);
    expect(3).to.equal(currentCategory.getTags().length);

    let noteToEdit = new Note();
    noteToEdit.setId(1);
    noteToEdit.setCategoryId(note1.getCategoryId());
    noteToEdit.setTitle('Note 1 - edited');
    noteToEdit.setContent('Lorem ipsum - edited');
    noteToEdit.setTags(note1.getTags());

    let tagsToAdd = new TagList();
    tagsToAdd.add('D');
    tagsToAdd.add('E');
    noteToEdit.addTags(tagsToAdd.get());

    let tagsToRemove = new TagList();
    tagsToRemove.add('B');
    noteToEdit.removeTags(tagsToRemove.get());

    let updateNoteResult = categoryStorage.updateNote(noteToEdit, tagsToAdd, tagsToRemove);
    expect(true).to.equal(updateNoteResult);
    let noteAfterEdit = currentCategory.getNote(noteToEdit.getId());
    expect(noteToEdit.getTitle()).to.equal(noteAfterEdit.getTitle());
    expect(noteToEdit.getContent()).to.equal(noteAfterEdit.getContent());
    expect(4).to.equal(currentCategory.getTags().length);
  });

  it('change note category', () => {
    let categoryStorage = new CategoryStorage();
    categoryStorage.add('Linux');
    let note1 = new Note();
    note1.setTitle('Note 1');
    note1.setContent('Lorem ipsum');
    note1.setCategoryId('linux');
    note1.addTag('A');
    note1.addTag('B');
    note1.addTag('C');
    categoryStorage.addNote(note1);
 
    let currentCategory = categoryStorage.getFor(note1.getCategoryId());
    expect(1).to.equal(currentCategory.getNotes().length);
    expect(3).to.equal(currentCategory.getTags().length);

    let noteToEdit = new Note();
    noteToEdit.setId(1);
    noteToEdit.setCategoryId('python');
    noteToEdit.setTitle('Note 1 - edited');
    noteToEdit.setContent('Lorem ipsum - edited');
    noteToEdit.setTags(note1.getTags());

    let tagsToAdd = new TagList();
    tagsToAdd.add('D');
    tagsToAdd.add('E');
    noteToEdit.addTags(tagsToAdd.get());

    let tagsToRemove = new TagList();
    tagsToRemove.add('B');
    noteToEdit.removeTags(tagsToRemove.get());

    categoryStorage.add('Python');

    let resultEdit = categoryStorage.changeNoteCategory(noteToEdit, note1);    
    expect(true).to.equal(resultEdit);
    let categoryWithNewNote = categoryStorage.getFor(noteToEdit.getCategoryId());
    expect(1).to.equal(categoryWithNewNote.getNotes().length);
    let noteInAnotherCategory = categoryWithNewNote.getNote(noteToEdit.getId());
    expect(noteToEdit.getCategoryId()).to.equal(noteInAnotherCategory.getCategoryId());
    expect(noteToEdit.getTitle()).to.equal(noteInAnotherCategory.getTitle());
    expect(noteToEdit.getContent()).to.equal(noteInAnotherCategory.getContent());
    expect(noteToEdit.getTags().length).to.equal(noteInAnotherCategory.getTags().length);
    expect(4).to.equal(categoryWithNewNote.getTags().length);
  });

  it('Edit note - update note and category tags - for the same category', () => {
    let categoryStorage = new CategoryStorage();
    categoryStorage.add('Linux');
    let note1 = new Note();
    note1.setTitle('Note 1');
    note1.setContent('Lorem ipsum');
    note1.setCategoryId('linux');
    note1.addTag('A');
    note1.addTag('B');
    note1.addTag('C');
    categoryStorage.addNote(note1);
    let noteToEdit = new Note();
    noteToEdit.setId(1);
    noteToEdit.setCategoryId('linux');
    noteToEdit.setTitle('Note 1 - edited');
    noteToEdit.setContent('Lorem ipsum - edited');
    noteToEdit.setTags(note1.getTags());

    let tagsToAdd = new TagList();
    tagsToAdd.add('D');
    tagsToAdd.add('E');
    noteToEdit.addTags(tagsToAdd.get());

    let tagsToRemove = new TagList();
    tagsToRemove.add('B');
    noteToEdit.removeTags(tagsToRemove.get());

    let resultEdit = categoryStorage.editNote(noteToEdit, tagsToAdd, tagsToRemove);
    expect(true).to.equal(resultEdit, 'Result edit');
    let editedNote = categoryStorage.getNoteFor(noteToEdit.getId());
    expect('Note 1 - edited').to.equal(editedNote.getTitle());
    expect('Lorem ipsum - edited').to.equal(editedNote.getContent());
    expect(4).to.equal(editedNote.getTags().length, 'Count of note tags'); 
    let categoryTags = categoryStorage.getTagsFor('linux');
    expect(4).to.equal(categoryTags.length, 'Count of category tags');
  });

  it('Edit note - for non-existing category - failure', () => {
    let categoryStorage = new CategoryStorage();
    categoryStorage.add('Linux');
    let note1 = new Note();
    note1.setTitle('Note 1');
    note1.setContent('Lorem ipsum');
    note1.setCategoryId('linux');
    note1.addTag('A');
    note1.addTag('B');
    note1.addTag('C');
    categoryStorage.addNote(note1);
    let noteToEdit = new Note();
    noteToEdit.setId(1);
    noteToEdit.setCategoryId('non-existing-category-code');
    noteToEdit.setTitle('Note 1 - edited');
    noteToEdit.setContent('Lorem ipsum - edited');
    noteToEdit.setTags(note1.getTags());

    let tagsToAdd = new TagList();
    tagsToAdd.add('D');
    tagsToAdd.add('E');
    noteToEdit.addTags(tagsToAdd.get());

    let tagsToRemove = new TagList();
    tagsToRemove.add('B');
    noteToEdit.removeTags(tagsToRemove.get());

    let resultEdit = categoryStorage.editNote(noteToEdit, tagsToAdd, tagsToRemove);
    expect(false).to.equal(resultEdit, 'Result edit');
    let editedNote = categoryStorage.getNoteFor(noteToEdit.getId());
    expect(note1.getTitle()).to.equal(editedNote.getTitle());
    expect(note1.getContent()).to.equal(editedNote.getContent());
    expect(note1.getTags().length).to.equal(editedNote.getTags().length, 'Count of note tags'); 
    let categoryTags = categoryStorage.getTagsFor('non-existing-category-code');
    expect(0).to.equal(categoryTags.length, 'Count of category tags');
  });

  it('Edit note - for non existing note - failure', () => {
    let categoryStorage = new CategoryStorage();
    categoryStorage.add('Linux');
    let note1 = new Note();
    note1.setTitle('Note 1');
    note1.setContent('Lorem ipsum');
    note1.setCategoryId('linux');
    note1.addTag('A');
    note1.addTag('B');
    note1.addTag('C');
    categoryStorage.addNote(note1);
    let noteToEdit = new Note();
    noteToEdit.setId(15234);
    noteToEdit.setCategoryId('linux');
    noteToEdit.setTitle('Note 1 - edited');
    noteToEdit.setContent('Lorem ipsum - edited');
    noteToEdit.setTags(note1.getTags());

    let tagsToAdd = new TagList();
    tagsToAdd.add('D');
    tagsToAdd.add('E');
    noteToEdit.addTags(tagsToAdd.get());

    let tagsToRemove = new TagList();
    tagsToRemove.add('B');
    noteToEdit.removeTags(tagsToRemove.get());

    let resultEdit = categoryStorage.editNote(noteToEdit, tagsToAdd, tagsToRemove);
    expect(false).to.equal(resultEdit, 'Result edit');
    let editedNote = categoryStorage.getNoteFor(noteToEdit.getId());
    expect('').to.equal(editedNote.getTitle());
    expect('').to.equal(editedNote.getContent());
    expect(0).to.equal(editedNote.getTags().length, 'Count of note tags'); 
    let categoryTags = categoryStorage.getTagsFor('linux');
    expect(3).to.equal(categoryTags.length, 'Count of category tags');
  });

  it('Edit note - change note category ', () => {
    let categoryStorage = new CategoryStorage();
    categoryStorage.add('Linux');
    let note1 = new Note();
    note1.setTitle('Note 1');
    note1.setContent('Lorem ipsum');
    note1.setCategoryId('linux');
    note1.addTag('A');
    note1.addTag('B');
    note1.addTag('C');
    categoryStorage.addNote(note1);

    let currentCategory = categoryStorage.getFor(note1.getCategoryId());
    expect(1).to.equal(currentCategory.getNotes().length);

    categoryStorage.add('Python');

    let noteToEdit = new Note();
    noteToEdit.setId(1);
    noteToEdit.setCategoryId('python');
    noteToEdit.setTitle('Note 1 - edited');
    noteToEdit.setContent('Lorem ipsum - edited');
    noteToEdit.setTags(note1.getTags());

    let tagsToAdd = new TagList();
    tagsToAdd.add('D');
    noteToEdit.addTags(tagsToAdd.get());

    let tagsToRemove = new TagList();

    let resultEdit = categoryStorage.editNote(noteToEdit, tagsToAdd, tagsToRemove);
    expect(true).to.equal(resultEdit, 'Result edit');
    let categoryWithNewNote = categoryStorage.getFor(noteToEdit.getCategoryId());
    expect(1).to.equal(categoryWithNewNote.getNotes().length);
    let noteInAnotherCategory = categoryWithNewNote.getNote(noteToEdit.getId());
    expect(noteToEdit.getCategoryId()).to.equal(noteInAnotherCategory.getCategoryId());
    expect(noteToEdit.getTitle()).to.equal(noteInAnotherCategory.getTitle());
    expect(noteToEdit.getContent()).to.equal(noteInAnotherCategory.getContent());
    expect(noteToEdit.getTags().length).to.equal(noteInAnotherCategory.getTags().length);
    expect(4).to.equal(categoryWithNewNote.getTags().length);
  });
});