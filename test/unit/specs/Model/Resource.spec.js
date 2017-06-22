 import Resource from '../../../../src/model/resource/resource.js'

describe('Resource model', () => {
  it('Create empty resource object', () => {
    let resource = new Resource();
    expect('').to.equal(resource.getTitle(), 'empty title');
    expect('').to.equal(resource.getCode(), 'empty code');
    expect('').to.equal(resource.getUrl(), 'empty url');
  });

  it('Create resource object with config data', () => {
    let resource = new Resource({ title: 'Python' });
    expect('Python').to.equal(resource.getTitle(), 'Non-empty title');
    expect('python').to.equal(resource.getCode(), 'Non-empty code');
    expect('').to.equal(resource.getUrl(), 'empty url');
  });

  it('getEmptyObject returns empty category object', () => {
    let resource = new Resource();
    let emptyObject = resource.getEmptyObject();
    expect('').to.equal(emptyObject.title);
    expect('').to.equal(emptyObject.code);
    expect('').to.equal(emptyObject.url);
  });
});