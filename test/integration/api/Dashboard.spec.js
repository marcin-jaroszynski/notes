process.env.NODE_ENV = 'test';

import chai from 'chai'; 
import chaiHttp from 'chai-http';
const should = chai.should();
const server = require('../../../server/server');
import { label } from '../../../server/util/colors.js';
import { generateToken } from '../db/Helper';

chai.use(chaiHttp);

describe(label('API: Dashboard'), () => {
  let token = '';
  beforeEach(async () => {
    token = await generateToken();
  });

  let getRequestParams = (params) => {
    return Object.assign({ token: token }, params);
  };

  it(label('GET: it should fetch latest entries'), (done) => {
    const params = getRequestParams({ currentPage: 1, numEntriesPerPage: 10 });
    chai.request(server)
        .get('/api/dashboard/get')
        .query(params)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').which.is.eql(true);
          res.body.should.have.property('entries').which.is.instanceof(Array);
          res.body.should.have.property('numOfAllEntries').which.is.a('number');
          done();
        });
  });
});