import Helper from './Helper.js';

describe('Category Tag model', () => {
  it('Create empty tag', () => {
    let emptyTag = Helper.getCategoryTag();
    expect('').to.equal(emptyTag.getTitle(), 'Title tag');
    expect('').to.equal(emptyTag.getCode(), 'Code tag');
    expect('').to.equal(emptyTag.getUrl(), 'URL tag');
    expect(0).to.equal(emptyTag.getCounter(), 'Counter tag');
  });

  it('Create not empty object', () => {
    let tag = Helper.getCategoryTag('Foo');
    tag.setCounter(2);
    expect('Foo').to.equal(tag.getTitle());
    expect('foo').to.equal(tag.getCode());
    expect('/tags/foo').to.equal(tag.getUrl());
  });
});