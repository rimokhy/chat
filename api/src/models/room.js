import mongoose from 'mongoose';
import base from './base';

const {ObjectId} = mongoose.Schema.Types;

const schema = mongoose.Schema(Object.assign({
    title: {type: String, required: true, unique: true},
    users: [{type: ObjectId, ref: 'user'}],
    private: {type: Boolean, default: true}
}, base));

const model = mongoose.model('room', schema);

export default model;
