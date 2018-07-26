import mongoose from 'mongoose';
import base from './base';

const { ObjectId } = mongoose.Schema.Types;

const schema = mongoose.Schema(Object.assign({
  content: String,
  channel: String,
  createdBy: { type: ObjectId, ref: 'user', required: true },
}, base));

const model = mongoose.model('message', schema);

export default model;
