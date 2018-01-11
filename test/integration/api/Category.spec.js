process.env.NODE_ENV = 'test';

import chai from 'chai'; 
import chaiHttp from 'chai-http';
const should = chai.should();
const server = require('../../../server/server');
import CategoryModel from '../../../server/db/models/category';
import { label } from '../../../server/util/colors.js';

chai.use(chaiHttp);

describe(label('API: Category'), () => {
  beforeEach(function(done) {
    CategoryModel.remove({}, function(err) {
      done();
    });
  });

  it(label('POST: Request should add new category'), (done) => {
    const category =  { title: "Foo" };
    chai.request(server)
        .post('/api/category/add')
        .send(category)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').which.is.eql(true);
          done();
        });
  });

  describe('POST: Request change title', () => { 
    it(label('Should change title for existing category'), (done) => {
      const params = { currentTitle: 'Foo', newTitle: 'Bar' };
      chai.request(server)
          .post('/api/category/change-title')
          .send(params)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').which.is.eql(true);
            done();
          });
    });

    it(label('Should fail if currenTitle and newTitle params are empty'), (done) => {
      const params = { currentTitle: '', newTitle: '' };
      chai.request(server)
          .post('/api/category/change-title')
          .send(params)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').which.is.eql(false);
            done();
          });
    });

    it(label('Should fail if currenTitle param is empty'), (done) => {
      const params = { currentTitle: '', newTitle: 'Bar' };
      chai.request(server)
          .post('/api/category/change-title')
          .send(params)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').which.is.eql(false);
            done();
          });
    });

    it(label('Should fail if newTitle param is empty'), (done) => {
      const params = { currentTitle: 'Foo', newTitle: '' };
      chai.request(server)
          .post('/api/category/change-title')
          .send(params)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').which.is.eql(false);
            done();
          });
    });
  });
});