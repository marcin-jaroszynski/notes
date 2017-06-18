import HelperModel from '../../../src/model/helper.js'

describe('Helper tests', () => {
  it('slufigy should return slugified string', () => {
    expect('html-5').to.equal(HelperModel.slugify('HTML 5'));
    expect('test').to.equal(HelperModel.slugify('Test!?#'));
    expect('php-7').to.equal(HelperModel.slugify('PHP                        7'));
  });
})