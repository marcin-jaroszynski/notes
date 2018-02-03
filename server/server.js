import express from 'express';
const app = express(); 
import bodyParser from 'body-parser';
import { addCategory, changeTitleCategory, getNotes } from './routes/category';
import { addNote, editNote } from './routes/note';
import { initStorage } from './routes/storage';
import { label } from './util/colors';
import dbConnect from './db';

dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));

app.post('/api/category/add', addCategory);
app.post('/api/category/change-title', changeTitleCategory);
app.get('/api/category/get-notes', getNotes);
app.post('/api/note/add', addNote);
app.post('/api/note/edit', editNote);
app.get('/api/storage/init', initStorage);

if ('dev' !== process.env.NODE_ENV) {
  app.listen(3000, function() {
    console.log('API notes server listening on port 3000');
  });
}


module.exports = app;