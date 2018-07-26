import mongoose from 'mongoose';
import base from './base';

const schema = mongoose.Schema(Object.assign({
    email: {type: String, unique: true},
    username: {type: String, unique: true},
    avatar: String,
    password: String,
}, base));

const model = mongoose.model('user', schema);

export default model;
