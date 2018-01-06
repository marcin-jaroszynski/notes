import mongoose from 'mongoose';
import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import { getCategories, addCategory } from './routes/category';
import { initStorage } from './routes/storage';
const config =  require('config');
import { label, errorLog } from './util/colors';

mongoose.connect(config.get('DB_HOST'), config.get('DB_OPTIONS'), function(err) {
  if (err) {
    console.log(errorLog('UNABLE TO CONNECT WITH MONGODB!'));
    console.log(errorLog('ERROR: ' + err));
    process.exit(0);
  }
});

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));

app.post('/api/add/category', addCategory);

app.get('/api/storage/init', initStorage);

if ('dev' !== process.env.NODE_ENV) {
  app.listen(3000, function() {
    console.log('API notes server listening on port 3000');
  });
}


module.exports = app;