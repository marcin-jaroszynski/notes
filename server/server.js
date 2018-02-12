import express from 'express';
const app = express(); 
import bodyParser from 'body-parser';
import { addCategory, changeTitleCategory, getNotes } from './routes/category';
import { addNote, editNote, getNote, removeNote } from './routes/note';
import { initStorage } from './routes/storage';
import { getEntries as getDashbordEntries } from './routes/dashboard';
import { label } from './util/colors';
import dbConnect from './db';
import ApiUrl from './apiUrl';


dbConnect();
let apiUrl = new ApiUrl(process.env.NODE_ENV);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));

app.post(apiUrl.categoryAdd(), addCategory);
app.post(apiUrl.categoryChangeTitle(), changeTitleCategory);
app.get(apiUrl.categoryNotes(), getNotes);
app.post(apiUrl.noteAdd(), addNote);
app.post(apiUrl.noteEdit(), editNote);
app.get(apiUrl.note(), getNote);
app.post(apiUrl.noteRemove(), removeNote);
app.get(apiUrl.storageInit(), initStorage);
app.get(apiUrl.dashboard(), getDashbordEntries);

if ('dev' !== process.env.NODE_ENV) {
  app.listen(3000, function() {
    console.log('API notes server listening on port 3000');
  });
}


module.exports = app;