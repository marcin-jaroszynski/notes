import NoteSchema from '../db/models/note';
import DashboardPagination from '../../src/model/dashboard/pagination';

async function getEntries(req, res) {
  let response = {};
  response.success = false;
  response.entries = [];
  response.numOfAllEntries = 0;
  try {
    if (req.query.currentPage) {
      response.numOfAllEntries = await NoteSchema.numOfNotes();
      let pagination = new DashboardPagination(response.numOfAllEntries);
      response.entries = await NoteSchema.getDashboardEntries(req.query.currentPage, pagination.getEntriesPerPage());
      response.success = true;
    }
  } catch(error) {
  }
  return res.json(response);
}

export { getEntries };