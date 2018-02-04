import CategorySchema from '../db/models/category';
import NoteSchema from '../db/models/note';

async function initStorage(req, res) {
  try {
    let categories = await CategorySchema.categories();
    let dashboardEntries = await NoteSchema.getDashboardEntries();
    res.json({ success: true, categories: categories, dashboard: dashboardEntries });
  } catch(error) {
    console.log(error);
  }
}

export { initStorage };