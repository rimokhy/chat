import {GraphQLList} from 'graphql';

import GraphQLRoom from '../GQL/model/room';
import {Room} from '../models'
import httpErrors from "../GQL/httpErrors";

export default {
    type: new GraphQLList(GraphQLRoom),
    args: {},
    resolve: async (obj, args, context) => {
        let room = await Room.find({
            users: {
                "$in": [context.user._id]
            }
        }).sort([['_createdAt', -1]]);
        if (room) {
            room = await room.map(room => {
                room.isUserIn = true;
                return room;
            });
        }
        return room;
    },
};
