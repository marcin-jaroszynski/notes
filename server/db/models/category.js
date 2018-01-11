import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import categoryTagSchema from './categoryTag.js';

const categorySchema = new Schema({
  title: { type: String, required: true },
  code: { type: String, index: true, unique: true },
  tags: [categoryTagSchema],
  created_date: { type: Date, default: Date.now() }
});

categorySchema.static('categories', function(callback) {
  return this.find({}).exec(callback);
});

categorySchema.static('changeTitle', function(currentCategory, updatedCategory) {
  let conditions = { code: currentCategory.getCode() };
  let update = { $set: { title: updatedCategory.getTitle(), code: updatedCategory.getCode() } };
  return this.update(conditions, update);
});

export default mongoose.model('category', categorySchema);