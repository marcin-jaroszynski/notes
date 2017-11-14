import Helper from './Helper.js';

describe('Tag model', () => {
  it('Create not empty object', () => {
    let tag = Helper.getTag('Front end');
    expect('Front end').to.equal(tag.getTitle());
    expect('/tags/front-end').to.equal(tag.getUrl());
  });
});