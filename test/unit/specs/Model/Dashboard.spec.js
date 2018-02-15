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

  it('reset', () => {
    let storage = Helper.getStorage();
    let category = storage.categories.get('linux');
    let nNotes = 10;
    let dashboard = getDashboardWithNotes(nNotes, category);
    expect(nNotes).to.equal(dashboard.length());
    dashboard.reset();
    expect(0).to.equal(dashboard.length());
  });
});