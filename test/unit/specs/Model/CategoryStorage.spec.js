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

  it('updateCategoryNote - update note and category tags', () => {
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

  it('updateCategoryNote - for non-existing category', () => {
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

  it('updateCategoryNote - for non existing note', () => {
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
});