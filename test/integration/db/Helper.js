import CategorySchema from '../../../server/db/models/category';
import NoteSchema from '../../../server/db/models/note';
import ConfigServerModel from '../../../server/db/models/config';
import jwt from 'jsonwebtoken';

function clearDb() {
  CategorySchema.remove({}).exec();
  NoteSchema.remove({}).exec();
}

async function generateToken() {
  let token = '';
  try { 
    let secret = await ConfigServerModel.getSecret();
    const payload = {
      login: 'login',
      password: 'password'
    };
    token = jwt.sign(payload, secret, { expiresIn: 60 });
  } catch(error) {
  }
  return token;
}

export { clearDb, generateToken };
