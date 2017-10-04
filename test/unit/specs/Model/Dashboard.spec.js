import Dashboard from '../../../../src/model/dashboard/dashboard.js'
import Storage from '../../../../src/model/storage/storage.js'
import Note from '../../../../src/model/note/note.js'
import Category from '../../../../src/model/category/category.js'


describe('Dashboard model', () => {
  let getCategory = (title) => {
    return new Category({ title: title });
  };

  let getNote = (id, categoryId) => {
    let note = new Note();
    note.setId(id);
    note.setCategoryId(categoryId);
    note.setTitle('Note ' + id);
    note.setContent('Lorem ipsum ' + id);
    return note;
  };

  it('add', () => {
    let storage = new Storage();
    storage.categories.add('Linux');

    let category = storage.categories.get('linux');

    let dashboard = new Dashboard();
    let iterations = 10;
    for (let i = 1; i <= iterations; i++) {
      let note = getNote(i, category.getCode());
      dashboard.add(note, category);
    }
    expect(iterations).to.equal(dashboard.length());
    let lastInsertedNote = getNote(11, category.getCode());
    dashboard.add(lastInsertedNote, category);
    expect(iterations).to.equal(dashboard.length());
    let topNote = dashboard.peek();
    expect(lastInsertedNote.getTitle()).to.equal(topNote.getNoteTitle());
    let lastNoteInDashboard = dashboard.floor();
    expect('Note 2').to.equal(lastNoteInDashboard.getNoteTitle());
  });

  it('update - change name of category', () => {
    let storage = new Storage();
    let categoryLinux = getCategory('Linux');
    storage.categories.add(categoryLinux.getTitle());
    let dashboard = new Dashboard();
    let nNotes = 2;
    for (let i = 1; i <= nNotes; i++) {
      let note = getNote(i, categoryLinux.getCode());
      dashboard.add(note, categoryLinux);
    }
    let categoryPython = getCategory('Python');
    dashboard.updateCategories(categoryLinux.getTitle(), categoryPython.getTitle());
    let counterUpdateDashbordItems = 0;
    let dashboardItems = dashboard.get();
    for (let i = 0; i < nNotes; i++) {
      if (dashboardItems[i].getCategoryTitle() == categoryPython.getTitle() &&
          dashboardItems[i].getCategoryUrl() == categoryPython.getUrl()) {
        counterUpdateDashbordItems++;
      }
    }
    expect(2).to.equal(counterUpdateDashbordItems);
  });

  it('update - update specific note data in dashboard', () => {
    let storage = new Storage();
    let categoryLinux = getCategory('Linux');
    storage.categories.add(categoryLinux.getTitle());
    let dashboard = new Dashboard();
    let nNotes = 2;
    for (let i = 1; i <= nNotes; i++) {
      let note = getNote(i, categoryLinux.getCode());
      dashboard.add(note, categoryLinux);
    }
    let categoryPython = getCategory('Python');
    storage.categories.add(categoryPython.getTitle());
    
    let noteEditId = 1;
    let noteEdit = getNote(noteEditId, categoryPython.getCode());
    let resultUpdateDashboardEntry = dashboard.updateEntry(noteEdit, categoryPython); 
    expect(true).to.equal(resultUpdateDashboardEntry);   

    let dashboardItems = dashboard.get();
    let isDashboardEntryUpdated = false;
    for (let i = 0; i < nNotes; i++) {
      if (dashboardItems[i].getNoteId() === noteEditId && 
          dashboardItems[i].getCategoryTitle() == categoryPython.getTitle()) {
          isDashboardEntryUpdated = true;
      }
    }
    expect(true).to.equal(isDashboardEntryUpdated);
  });

  it('remove specific entry from dashboard', () => {
    let storage = new Storage();
    let categoryLinux = getCategory('Linux');
    storage.categories.add(categoryLinux.getTitle());
    let dashboard = new Dashboard();
    let nNotes = 2;
    for (let i = 1; i <= nNotes; i++) {
      let note = getNote(i, categoryLinux.getCode());
      dashboard.add(note, categoryLinux);
    }
    expect(2).to.equal(dashboard.length());
    let noteIdToRemove = 1;
    dashboard.remove(noteIdToRemove);
    expect(1).to.equal(dashboard.length());
  });

});