import express from 'express';
const app = express(); 
import bodyParser from 'body-parser';
import { addCategory, changeTitleCategory, getNotes } from './routes/category';
import { addNote, editNote, getNote, removeNote, getByTagNote } from './routes/note';
import { initStorage } from './routes/storage';
import { getEntries as getDashbordEntries } from './routes/dashboard';
import { login } from './routes/login';
import { label } from './util/colors';
import dbConnect from './db';
import ApiUrl from './apiUrl';
import ConfigServerModel from './db/models/config';
import UserSchema from './db/models/user';
import jwt from 'jsonwebtoken';

dbConnect();
ConfigServerModel.setup();
let apiUrl = new ApiUrl(process.env.NODE_ENV);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let authCheck = async (req, res, next) => {
  let response = { success: false };
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    try {
      let secret = await ConfigServerModel.getSecret();
      let decoded = await jwt.verify(token, secret);
      req.decoded = decoded;
      next();
    } catch(error) {
      res.json(response);
    }
  } else {
   res.json(response);
  }
};

app.get(apiUrl.login(), login);
app.post(apiUrl.categoryAdd(), authCheck, addCategory);
app.post(apiUrl.categoryChangeTitle(), authCheck, changeTitleCategory);
app.get(apiUrl.categoryNotes(), authCheck, getNotes);
app.post(apiUrl.noteAdd(), authCheck, addNote);
app.post(apiUrl.noteEdit(), authCheck, editNote);
app.get(apiUrl.note(), authCheck, getNote);
app.post(apiUrl.noteRemove(), authCheck, removeNote);
app.get(apiUrl.noteGetByTag(), authCheck, getByTagNote);
app.get(apiUrl.storageInit(), authCheck, initStorage);
app.get(apiUrl.dashboard(), authCheck, getDashbordEntries);

if ('dev' !== process.env.NODE_ENV) {
  app.listen(3000, function() {
    console.log('API notes server listening on port 3000');
  });
}


module.exports = app;