import CategorySchema from '../db/models/category';
import NoteModel from '../../src/model/note/note';

async function addNote(req, res) {
  let response = {};
  response.success = false;
  try {
    if (req.body.title && req.body.content && req.body.category) {
      let note = new NoteModel();
      note.setTitle(req.body.title);
      note.setContent(req.body.content);
      note.setCategoryId(req.body.category);
      if (req.body.tags) {
        note.tags.set(req.body.tags);
      } 
      let idAddedNote = await CategorySchema.addNote(note);
      response.idAddedNote = idAddedNote;
      response.success = true;
    }
    res.json(response);
  } catch(error) {
    res.json(response);
  } 
}


async function editNote(req, res) {
  let response = {};
  response.success = false;
  try {
    if (req.body.id && req.body.title && req.body.content && req.body.category) {
      let note = new NoteModel();
      note.setId(req.body.id);
      note.setTitle(req.body.title);
      note.setContent(req.body.content);
      note.setCategoryId(req.body.category);
      if (req.body.tags) {
        note.tags.set(req.body.tags);
      } else {
        note.tags.set([]);
      }
      await CategorySchema.updateNote(note);
      response.success = true;
    }
    res.json(response);
  } catch(error) {
    res.json(response);
  } 
}

export { addNote, editNote };