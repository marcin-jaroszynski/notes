 import Note from '../../../../src/model/note/note.js'

 describe('Note model', () => {
  it('Create empty object', () => {
    let note = new Note();
    expect(0).to.equal(note.id);
    expect('').to.equal(note.categoryId);
    expect('').to.equal(note.title);
    expect('').to.equal(note.content);
    expect('').to.equal(note.url);
    expect(0).to.equal(note.getTags().length);
  });
 });