import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ConfigServerModel from './config';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  login: { type: String, required: true }, 
  password: { type: String, required: true }
});

userSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.static('validateCreditentials', async function(login, password) {
  let result = false;
  let user = await this.findOne({login: login});
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      result = true;
    }
  } 
  return result;
});

userSchema.static('getToken', async function(login) {
  let token = '';
  let user = await this.findOne({login: login});
  if (user) {  
    let secret = await ConfigServerModel.getSecret();
    const payload = {
      login: user.login,
      password: user.password
    };
    token = jwt.sign(payload, secret, { expiresIn: 60*60*24 });
  }
  return token;
});

export default mongoose.model('user', userSchema);