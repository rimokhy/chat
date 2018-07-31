import {GraphQLList} from 'graphql';

import GraphQLRoom from '../GQL/model/room';
import {Room} from '../models'

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
            await room.forEach((data, index) => {
                data.isUserIn = true;
                room[index] = data;
            });
        }
        return room;
    },
};
