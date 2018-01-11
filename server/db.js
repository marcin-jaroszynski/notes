import mongoose from 'mongoose';
let config = require('config');
import { errorLog } from './util/colors';

mongoose.Promise = global.Promise;

async function dbConnect() {
  try {
    await mongoose.connect(config.get('DB_HOST'), config.get('DB_OPTIONS'));
  } catch(error) {
    if (error) {
      console.log(errorLog('UNABLE TO CONNECT WITH MONGODB!'));
      console.log(errorLog('ERROR: ' + error));
      process.exit(0);
    }
  }
}

export default dbConnect;