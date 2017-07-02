 import Note from '../../../../src/model/note/note.js'

 describe('Note model', () => {
  it('Create empty object', () => {
    let note = new Note();
    expect('').to.equal(note.title);
    expect('').to.equal(note.content);
    expect(0).to.equal(note.getTags().length);
  });

  it('add non-existing tag', () => {
    let note = new Note();
    expect(true).to.equal(note.addTag('Foo'));
    expect(1).to.equal(note.getTags().length);
  });

  it('try to add exisiting tag', () => {
    let note = new Note();
    expect(true).to.equal(note.addTag('Foo'));
    expect(1).to.equal(note.getTags().length);
    expect(false).to.equal(note.addTag('Foo'), 'Try to add exisitng tag');
    expect(1).to.equal(note.getTags().length);
  });

  it('remove tag', () => {
    let note = new Note();
    expect(true).to.equal(note.addTag('Foo'));
    expect(1).to.equal(note.getTags().length);
    expect(true).to.equal(note.addTag('Bar'));
    expect(2).to.equal(note.getTags().length);
    expect(true).to.equal(note.removeTag('Foo'));
    expect(1).to.equal(note.getTags().length);
  });
 });