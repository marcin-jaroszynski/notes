import Dashboard from '../../../../src/model/dashboard/dashboard.js'
import CategoryStorage from '../../../../src/model/category/storage.js'
import Note from '../../../../src/model/note/note.js'

describe('Dashboard model', () => {
  it('add', () => {
    let categoryStorage = new CategoryStorage();
    categoryStorage.add('Linux');

    let dashboard = new Dashboard();
    let iterations = 10;
    for (let i = 1; i <= iterations; i++) {
      let note = new Note();
      note.setId(1);
      note.setCategoryId('linux');
      note.setTitle('Note ' + i);
      note.setContent('Lorem ipsum');
      dashboard.add(note);
    }
    expect(iterations).to.equal(dashboard.get().length());
    let lastInsertedNote = new Note();
    lastInsertedNote.setId(11);
    lastInsertedNote.setCategoryId('linux');
    lastInsertedNote.setTitle('Note 11');
    lastInsertedNote.setContent('Lorem ipsum');
    dashboard.add(lastInsertedNote);
    expect(iterations).to.equal(dashboard.get().length());
    let topNote = dashboard.peek();
    expect(lastInsertedNote.getTitle()).to.equal(topNote.getTitle());
    let lastNoteInDashboard = dashboard.floor();
    expect('Note 2').to.equal(lastNoteInDashboard.getTitle());
  });
});