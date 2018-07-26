import mongoose from 'mongoose';
import base from './base';

const {ObjectId} = mongoose.Schema.Types;

const schema = mongoose.Schema(Object.assign({
    title: {type: String, required: true},
    room: {type: ObjectId, ref: 'room'},
    users: [{type: ObjectId, ref: 'user'}],
}, base));

const model = mongoose.model('channel', schema);

export default model;
