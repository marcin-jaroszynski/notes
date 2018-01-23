import NoteSchema from '../db/models/note';

function addNote(req, res) {
  let response = {};
  response.success = true;
  res.json(response); 
}

export { addNote };