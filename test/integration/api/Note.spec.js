process.env.NODE_ENV = 'test';

import chai from 'chai'; 
import chaiHttp from 'chai-http';
const should = chai.should();
const server = require('../../../server/server');
import { label } from '../../../server/util/colors.js';
import CategorySchema from '../../../server/db/models/category';
import NoteModel from '../../../src/model/note/note';

chai.use(chaiHttp);

describe(label('API: Notes'), () => {
  it(label('POST: Add note'), (done) => {
    let params = { title: 'Note 1', content: 'Lorem ipsum', category: 'foo' };
    chai.request(server)
        .post('/api/note/add')
        .send(params)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').which.is.eql(true);
          res.body.should.have.property('idAddedNote').which.is.not.empty;
          done();
        });
  });

  it(label('POST: Edit note'), (done) => {
    let params = { id: '5a6a3f242f05ab23d4baf60e', title: 'Note 1 edited', content: 'Lorem ipsum edited', category: 'foo' };
    chai.request(server)
      .post('/api/note/edit')
      .send(params)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').which.is.eql(true);
        done();
      });
  });

  describe(label('Fetch note'), () => { 
    let idAddedNote = '';

    beforeEach(async () => {
      let note = new NoteModel();
      note.setTitle('Note');
      note.setContent('Lorem ipsum');
      note.setCategoryId('foo');
      note.tags.set([]);
      idAddedNote = await CategorySchema.addNote(note);
    });

    it(label('GET: Fetch existing note'), (done) => {
      const params = { id: idAddedNote.toString() };
      chai.request(server)
          .get('/api/note/get')
          .query(params)
          .end((err, res) => { 
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').which.is.eql(true);
            res.body.should.have.property('id').which.is.not.empty;
            res.body.should.have.property('title').which.is.not.empty;
            res.body.should.have.property('content').which.is.not.empty;
            res.body.should.have.property('category').which.is.not.empty;
            res.body.should.have.property('created_date').which.is.not.empty;
            res.body.should.have.property('tags').which.is.instanceof(Array);
            done();
          });
    });
  });

  it(label('POST: Remove note'), (done) => {
    let params = { id: '5a6a3f242f05ab23d4baf60e' };
    chai.request(server)
      .post('/api/note/remove')
      .send(params)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').which.is.eql(true);
        done();
      });
  });
});