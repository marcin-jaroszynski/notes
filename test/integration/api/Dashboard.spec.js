process.env.NODE_ENV = 'test';

import chai from 'chai'; 
import chaiHttp from 'chai-http';
const should = chai.should();
const server = require('../../../server/server');
import { label } from '../../../server/util/colors.js';

chai.use(chaiHttp);

describe(label('API: Dashboard'), () => {
  it(label('GET: it should fetch latest entries'), (done) => {
    chai.request(server)
        .get('/api/dashboard/get')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').which.is.eql(true);
          res.body.should.have.property('entries').which.is.instanceof(Array);
          done();
        });
  });
});