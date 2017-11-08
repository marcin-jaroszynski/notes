import Helper from './Helper.js';

describe('Dashboard model', () => {

  let getDashboardWithNotes = (nNotes, categoryNote) => {
    let dashboard = Helper.getDashboard();
    for (let i = 1; i <= nNotes; i++) {
      let note = Helper.getNote('Note ' + i);
      note.setId(i);
      note.setCategoryId(categoryNote.getCode());
      dashboard.add(note, categoryNote);
    }
    return dashboard;
  }; 

  it('add', () => {
    let storage = Helper.getStorage();
    let categoryLinux = Helper.getCategory('Linux');
    storage.categories.add(categoryLinux);
    let category = storage.categories.get('linux');
    let nNotes = 10;
    let dashboard = getDashboardWithNotes(nNotes, category);
    expect(nNotes).to.equal(dashboard.length());
    let lastInsertedNote = Helper.getNote('Note 11');
    lastInsertedNote.setId(11);
    lastInsertedNote.setCategoryId(category.getCode());
    dashboard.add(lastInsertedNote, category);
    expect(nNotes).to.equal(dashboard.length());
    let topNote = dashboard.peek();
    expect(lastInsertedNote.getTitle()).to.equal(topNote.getNoteTitle());
    let lastNoteInDashboard = dashboard.floor();
    expect('Note 2').to.equal(lastNoteInDashboard.getNoteTitle());
  });

  it('update - change name of category', () => {
    let storage = Helper.getStorage();
    let categoryLinux = Helper.getCategory('Linux');
    storage.categories.add(categoryLinux);
    let nNotes = 2;
    let dashboard = getDashboardWithNotes(nNotes, categoryLinux);
    let categoryPython = Helper.getCategory('Python');
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
    let storage = Helper.getStorage();
    let categoryLinux = Helper.getCategory('Linux');
    storage.categories.add(categoryLinux);
    let nNotes = 2;
    let dashboard = getDashboardWithNotes(nNotes, categoryLinux);
    let categoryPython = Helper.getCategory('Python');
    storage.categories.add(categoryPython);
    
    let noteEditId = 1;
    let noteEdit = Helper.getNote('Note ' + noteEditId);
    noteEdit.setId(noteEditId);
    noteEdit.setCategoryId(categoryPython.getCode());
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
    let storage = Helper.getStorage();
    let categoryLinux = Helper.getCategory('Linux');
    storage.categories.add(categoryLinux);
    let nNotes = 2;
    let dashboard = getDashboardWithNotes(nNotes, categoryLinux);
    expect(2).to.equal(dashboard.length());
    let noteIdToRemove = 1;
    dashboard.remove(noteIdToRemove);
    expect(1).to.equal(dashboard.length());
  });

});