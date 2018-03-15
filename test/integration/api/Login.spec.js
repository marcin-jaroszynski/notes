process.env.NODE_ENV = 'test';

import chai from 'chai'; 
import chaiHttp from 'chai-http';
const should = chai.should();
const server = require('../../../server/server');
import { label } from '../../../server/util/colors.js';
import UserSchema from '../../../server/db/models/user';

chai.use(chaiHttp);

describe(label('API: Login'), () => {
  let getUserCreditentials = () => {
    return { login: 'user', password: 'pass' };
  };

  let getUserInvalidCreditentials = () => {
    return { login: 'notExistUser', password: 'invalidPass' };
  };

  beforeEach(async function() {
    let user = new UserSchema(getUserCreditentials());
    await user.save();
  });

  afterEach(async function() {
    await UserSchema.remove({});
  });

  it(label('GET: it should returns token after login successfull'), (done) => {
    const params = getUserCreditentials();
    chai.request(server)
        .get('/api/login')
        .query(params)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').which.is.eql(true);
          res.body.should.have.property('categories').which.is.instanceof(Array);
          res.body.should.have.property('token').which.is.a('string').not.empty;
          done();
        });
  });

  it(label('GET: For invalid login or password should fail'), (done) => {
    const params = getUserInvalidCreditentials();
    chai.request(server)
        .get('/api/login')
        .query(params)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('success').which.is.eql(false);
          res.body.should.have.property('token').which.is.empty;
          done();
        });
  });
});