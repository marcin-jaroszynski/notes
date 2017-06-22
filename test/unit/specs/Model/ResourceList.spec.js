import ResourceList from '../../../../src/model/resource/list.js'

describe('Resource list model', () => {
  let getNonEmptyResourceList = () => {
    let resourceList = new ResourceList();
    resourceList.add('Front end');
    return resourceList;
  };

  it('Add new resource', () => {
    let resourceList = getNonEmptyResourceList();
    let addedResource = resourceList.get()[0]; 
    expect('Front end').to.equal(addedResource.getTitle());
    expect('front-end').to.equal(addedResource.getCode());
  });

  it('Find resource - founded', () => {
    let resourceList = getNonEmptyResourceList();
    let resourceToFind = resourceList.checkIsExist('Front end');
    expect('Front end').to.equal(resourceToFind.getTitle());
    expect('front-end').to.equal(resourceToFind.getCode());
  });

  it('Find resource - not founded', () => {
    let resourceList = getNonEmptyResourceList();
    let resourceToFind = resourceList.checkIsExist('Foo');
    expect('').to.equal(resourceToFind.getTitle());
    expect('').to.equal(resourceToFind.getCode());
  });

  it('Remove resource from list - success', () => {
    let resourceList = getNonEmptyResourceList();
    expect(true).to.equal(resourceList.remove('Front end'));
  });
});