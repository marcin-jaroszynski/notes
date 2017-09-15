import Dashboard from '../../../../src/model/dashboard/dashboard.js'
import Storage from '../../../../src/model/storage/storage.js'
import Note from '../../../../src/model/note/note.js'

describe('Dashboard model', () => {
  it('add', () => {
    let storage = new Storage();
    storage.categories.add('Linux');

    let category = storage.categories.get('linux');

    let dashboard = new Dashboard();
    let iterations = 10;
    for (let i = 1; i <= iterations; i++) {
      let note = new Note();
      note.setId(1);
      note.setCategoryId(category.getCode());
      note.setTitle('Note ' + i);
      note.setContent('Lorem ipsum');
      dashboard.add(note, category);
    }
    expect(iterations).to.equal(dashboard.get().length());
    let lastInsertedNote = new Note();
    lastInsertedNote.setId(11);
    lastInsertedNote.setCategoryId(category.getCode());
    lastInsertedNote.setTitle('Note 11');
    lastInsertedNote.setContent('Lorem ipsum');
    dashboard.add(lastInsertedNote, category);
    expect(iterations).to.equal(dashboard.get().length());
    let topNote = dashboard.peek();
    expect(lastInsertedNote.getTitle()).to.equal(topNote.getNoteTitle());
    let lastNoteInDashboard = dashboard.floor();
    expect('Note 2').to.equal(lastNoteInDashboard.getNoteTitle());
  });
});