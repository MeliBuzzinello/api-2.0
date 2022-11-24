import mongoose from 'mongoose';
import config from '../../config.js';

const Schema = mongoose.Schema;

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    direction: { type: String, required: true },
    year: { type: Number, required: true },
    phone: { type: Number, required: true }
  });
  
  
export default mongoose.model('usuarios', UserSchema);