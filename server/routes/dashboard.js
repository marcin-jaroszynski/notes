import NoteSchema from '../db/models/note';

async function getEntries(req, res) {
  let response = {};
  response.success = false;
  response.entries = [];
  try {
    response.entries = await NoteSchema.getDashboardEntries();
    response.success = true;
  } catch(error) {
  }
  return res.json(response);
}

export { getEntries };