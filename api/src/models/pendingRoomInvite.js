import mongoose from 'mongoose';
import base from './base';

const {ObjectId} = mongoose.Schema.Types;

const schema = mongoose.Schema(Object.assign({
    from: {type: ObjectId, ref: 'room', required: true},
    to: {type: ObjectId, ref: 'user', required: true},
    status: {type: String, enum: ['PENDING', 'OK', 'KO']},
}, base));

const model = mongoose.model('pending_room_invite', schema);

export default model;
