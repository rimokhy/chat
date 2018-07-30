import {GraphQLList} from 'graphql';

import GraphQLRoom from '../GQL/model/room';
import {Room} from '../models'

export default {
    type: new GraphQLList(GraphQLRoom),
    args: {},
    resolve: async (obj, args, context) => {
        let room = await Room.find({private: false})
            .sort([['_createdAt', -1]]);
        if (room) {
            room = await room.map(room => {
                room.isUserIn = false;
                return room;
            });
        }
        return room;
    },
};
