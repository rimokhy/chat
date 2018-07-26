import mongoose from 'mongoose';
import base from './base';

const { ObjectId } = mongoose.Schema.Types;

const schema = mongoose.Schema(Object.assign({
  accessToken: { type: String, unique: true, required: true },
  refreshToken: String,
  expires: { type: Date, default: () => Date.now() + (7 * 24 * 60 * 60 * 1000) },
  user: { type: ObjectId, ref: 'user' },
}, base));


const model = mongoose.model('token', schema);

export default model;
