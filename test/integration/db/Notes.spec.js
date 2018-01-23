process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
const config = require('config');
import HelperUnit from '../../unit/specs/Model/Helper';
import NoteSchema from '../../../server/db/models/note';
import { label, errorLog } from '../../../server/util/colors';
import chai from 'chai'; 
const expect = chai.expect;
import chaiAsPromised from 'chai-as-promised';
import dbConnect from '../../../server/db.js';
import clearDb from './Helper.js';

chai.use(chaiAsPromised);

dbConnect();

describe(label('DB: Note'), () => {
  beforeEach(async () => {
    // await clearDb();
  });

  // describe(label('Add note fail if one of required arguments is empty'), () => {
  //   it(label('Title is not defined'), async () => {
  //     try {
  //       let noteToAdd = HelperUnit.getNote(null, ['Tag 1', 'Tag 2']); 
  //       noteToAdd.setContent('Lorem ipsum');
  //       noteToAdd.setCategoryId('foo');
  //       return expect(NoteSchema.add(noteToAdd)).is.rejected;
  //     } catch(error) {
  //       console.log(error);
  //     }
  //   });

  //   it(label('Content is not defined'), async () => {
  //     try {
  //       let noteToAdd = HelperUnit.getNote('Note 1', ['Tag 1', 'Tag 2']); 
  //       noteToAdd.setContent(null);
  //       noteToAdd.setCategoryId('foo');
  //       return expect(NoteSchema.add(noteToAdd)).is.rejected;
  //     } catch(error) {
  //       console.log(error);
  //     }
  //   });

  //   it(label('Category is not defined'), async () => {
  //     try {
  //       let noteToAdd = HelperUnit.getNote('Note 1', ['Tag 1', 'Tag 2']); 
  //       noteToAdd.setContent('Lorem ipsum');
  //       return expect(NoteSchema.add(noteToAdd)).is.rejected;
  //     } catch(error) {
  //       console.log(error);
  //     }
  //   });
  // });

  // it(label('Update note - update tags'), async () => {
  //   try {
  //     let note = HelperUnit.getNote('Note 1', ['Tag 1', 'Tag 2', 'Tag 3']); 
  //     note.setContent('Lorem ipsum');
  //     let categoryFoo = HelperUnit.getCategory('Foo');
  //     note.setCategoryId(categoryFoo.getCode());
  //     let addedNoteId = await NoteSchema.add(note);
  //     note.setId(addedNoteId);
  //     let noteAfterAdd = await NoteSchema.findOne({_id: note.getId()});
  //     expect(3).to.equal(noteAfterAdd.tags.length);
  //     note.tags.remove('Tag 3');
  //     note.tags.add('Tag 4');
  //     note.tags.add('Tag 5');
  //     await NoteSchema.edit(note);
  //     let noteAfterUpdate = await NoteSchema.findOne({_id: note.getId()});
  //     expect(4).to.equal(noteAfterUpdate.tags.length);
  //   } catch(error) {
  //     console.log(error);
  //   }
  // });

});