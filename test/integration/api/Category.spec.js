process.env.NODE_ENV = 'test';

import chai from 'chai'; 
import chaiHttp from 'chai-http';
const should = chai.should();
const server = require('../../../server/server');
import CategoryModel from '../../../server/db/models/category';
import { label } from '../../../server/util/colors.js';

chai.use(chaiHttp);

describe(label('Category'), () => {
  beforeEach(function(done) {
    CategoryModel.remove({}, function(err) {
      done();
    });
  });

  it(label('POST: it should add new category'), (done) => {
    const category =  { title: "Foo" };
    chai.request(server)
        .post('/api/add/category')
        .send(category)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').which.is.eql(true);
          done();
        });
  });
});