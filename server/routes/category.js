import CategorySchema from '../db/models/category';
import CategoryModel from '../../src/model/category/category.js'

function getCategories(req, res) {
  CategorySchema.categories(function(err, data) {
    res.json(data);
  });
}

function addCategory(req, res) {
  let category = new CategoryModel({title: req.body.title});
  let categorySchema = new CategorySchema({ title: category.getTitle(), code: category.getCode() });
  
  categorySchema.save(function(err) {
    let response = {};
    response.success = true;
    response.message = '';
    if (err) {
      response.message = err;
      response.success = false;
    } 
    res.json(response); 
  });
}

export { getCategories, addCategory };