import mongoose from 'mongoose';
const Schema = mongoose.Schema

const categoryTagSchema = new Schema({
  title: String,
  code: String,
  counter: Number
});

export default categoryTagSchema;