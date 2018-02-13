import CategorySchema from '../db/models/category';
import NoteSchema from '../db/models/note';
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
      let addedNote = await CategorySchema.addNote(note);
      response.idAddedNote = addedNote._id;
      response.dateAddedNote = addedNote.created_date;
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

async function getNote(req, res) {
  let response = {};
  response.success = false;
  try {
    if (req.query.id) {    
      let note = await NoteSchema.note(req.query.id);
      response.id = note._id;
      response.title = note.title;
      response.content = note.content;
      response.category = note.category;
      response.created_date = note.created_date;
      response.tags = note.tags;
      response.success = true;
    }
  } catch(error) {
  }
  res.json(response);
}

async function removeNote(req, res) {
  let response = {};
  response.success = false;
  try {
    if (req.body.id) {    
      await CategorySchema.removeNote(req.body.id);
      response.success = true;
    }
  } catch(error) {
  }
  res.json(response);
}

async function getByTagNote(req, res) {
  let response = {};
  response.success = false;
  try {
    if (req.query.tag) {
      response.notes = await NoteSchema.getByTag(req.query.tag);
      response.success = true;
    } 
  } catch(error) {
  }
  res.json(response);
}

export { addNote, editNote, getNote, removeNote, getByTagNote };