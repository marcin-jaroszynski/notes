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

export default mongoose.model('category', categorySchema);