import CategorySchema from '../db/models/category';

async function initStorage(req, res) {
  try {
    let categories = await CategorySchema.categories();
    res.json({ success: true, categories: categories });
  } catch(error) {
    console.log(error);
  }
}

export { initStorage };