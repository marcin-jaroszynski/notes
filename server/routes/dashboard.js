import NoteSchema from '../db/models/note';

async function getEntries(req, res) {
  let response = {};
  response.success = false;
  response.entries = [];
  response.numOfAllEntries = 0;
  try {
    let currentPage = parseInt(req.query.currentPage);
    let numEntriesPerPage = parseInt(req.query.numEntriesPerPage);
    if (currentPage && numEntriesPerPage) {
      response.numOfAllEntries = await NoteSchema.numOfNotes();
      response.entries = await NoteSchema.getDashboardEntries(currentPage, numEntriesPerPage);
      response.success = true;
    }
  } catch(error) {
  }
  return res.json(response);
}

export { getEntries };