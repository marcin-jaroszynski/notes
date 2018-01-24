import CategorySchema from '../db/models/category';
import CategoryModel from '../../src/model/category/category';

async function getCategories(req, res) {
  CategorySchema.categories(function(err, data) {
    res.json(data);
  });
}

async function addCategory(req, res) {
  let category = new CategoryModel({title: req.body.title});
  let categorySchema = new CategorySchema({ title: category.getTitle(), code: category.getCode() });
  
  let response = {};
  response.success = true;
  response.message = '';
  try {
    await categorySchema.save();
  } catch(err) {
    response.message = err;
    response.success = false;
  }
  res.json(response);
}

async function changeTitleCategory(req, res) {
  let response = {};
  response.success = true;
  if (!req.body.currentTitle || !req.body.newTitle) {
    response.success = false;
    return res.json(response);
  }
  let currentCategory = new CategoryModel({title: req.body.currentTitle});
  let updateCategory = new CategoryModel({title: req.body.newTitle});
  
  try {
    await CategorySchema.changeTitle(currentCategory, updateCategory);
  } catch(err) {
    response.success = false;
  }
  res.json(response);
}

export { getCategories, addCategory, changeTitleCategory };