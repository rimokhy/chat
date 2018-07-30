import mongoose from 'mongoose';
import base from './base';

const {ObjectId} = mongoose.Schema.Types;

const schema = mongoose.Schema(Object.assign({
    title: {type: String, required: true, unique: true},
    users: [{type: ObjectId, ref: 'user'}],
    private: {type: Boolean, default: true}
    //TODO: validator nb channel inside room http://mongoosejs.com/docs/api.html#schematype_SchemaType-validate
}, base));

const model = mongoose.model('room', schema);

export default model;
