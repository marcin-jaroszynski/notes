import Helper from './Helper.js';

describe('Note model', () => {
  it('Create empty object', () => {
    let note = Helper.getNote();
    expect(0).to.equal(note.id, 'Empty ID');
    expect('').to.equal(note.categoryId, 'Empty category ID');
    expect('').to.equal(note.title, 'Empty title');
    expect('').to.equal(note.content, 'Empty content');
    expect('').to.equal(note.url, 'Empty url');
    expect(0).to.equal(note.tags.length(), 'Zero tags');
  });
});