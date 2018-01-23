import mongoose from 'mongoose';
const Schema = mongoose.Schema

const noteTagSchema = new Schema({
  title: String,
  code: String
});

export default noteTagSchema;