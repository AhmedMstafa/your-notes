import { Schema, model } from 'mongoose';
import validator from 'validator';
import userRules from '../utils/user.Rules.js';

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    validate: [validator.isEmail, 'filed must be a valid email address'],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  birthdayYear: {
    type: Number,
    required: true,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: [userRules.USER, userRules.ADMIN, userRules.MANGER],
    default: userRules.USER,
  },
});

export default model('User', userSchema);
