process.env.NODE_ENV = 'test';

import chai from 'chai'; 
import chaiHttp from 'chai-http';
const should = chai.should();
const server = require('../../../server/server');
import { label } from '../../../server/util/colors.js';

chai.use(chaiHttp);

describe(label('API: Notes'), () => {
  it(label('POST: Add note'), (done) => {
    let params = {};
    chai.request(server)
        .post('/api/note/add')
        .send(params)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').which.is.eql(true);
          done();
        });
  });
});