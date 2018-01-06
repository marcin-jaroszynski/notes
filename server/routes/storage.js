import CategorySchema from '../db/models/category';

function initStorage(req, res) {
  CategorySchema.categories(function(err, data) {
    res.json({ success: true, categories: data });
  });
}

export { initStorage };