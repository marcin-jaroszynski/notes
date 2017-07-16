import Note from '../../../../src/model/note/note.js'
import NoteList from '../../../../src/model/note/list.js'

describe('Note list model', () => {
  it('Get specific note', () => {
    let noteList = new NoteList();

    let note1 = new Note();
    note1.setId(1);
    note1.setTitle('Note 1');
    noteList.add(note1);

    let note2 = new Note();
    note2.setId(2);
    note2.setTitle('Note 2');
    noteList.add(note2);

    let currentNote = noteList.getFor(note1.getId());
    expect(note1.getId()).to.equal(currentNote.getId());
    expect(note1.getTitle()).to.equal(currentNote.getTitle());

    currentNote = noteList.getFor(note2.getId());
    expect(note2.getId()).to.equal(currentNote.getId());
    expect(note2.getTitle()).to.equal(currentNote.getTitle());
  });

  it('Remove note', () => {
    let noteList = new NoteList();

    let note1 = new Note();
    note1.setId(1);
    note1.setTitle('Note 1');
    noteList.add(note1);

    let note2 = new Note();
    note2.setId(2);
    note2.setTitle('Note 2');
    noteList.add(note2);

    expect(2).to.equal(noteList.get().length);
    let resultRemoveNote = noteList.remove(note1.getId());
    expect(true).to.equal(resultRemoveNote);
    expect(1).to.equal(note1.getId());
  });
});