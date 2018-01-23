import mongoose from 'mongoose';
const Schema = mongoose.Schema

const categoryTagSchema = new Schema({
  title: String,
  code: String,
  counter: { type: Number, default: 1 }
});


export default categoryTagSchema;