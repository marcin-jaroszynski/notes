import mongoose from 'mongoose';
import crypto from 'crypto';

const Schema = mongoose.Schema;

const configSchema = new Schema({
  secret: { type: String, required: true } 
});


configSchema.static('setup', async function() {
  await this.remove({});
  let secret = crypto.randomBytes(32).toString('hex');
  let instance = new this({ secret: secret });
  await instance.save();
});

configSchema.static('getSecret', async function() {
  let data = await this.findOne({});
  let secret = '';
  if (data) {
    secret = data.secret;
  }
  return secret;
});

export default mongoose.model('config', configSchema);