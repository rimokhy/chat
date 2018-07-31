import {GraphQLList} from 'graphql';

import GraphQLRoom from '../GQL/model/room';
import {Room} from '../models'
import {hasUser} from "../subscriptions/roomEvent";

export default {
    type: new GraphQLList(GraphQLRoom),
    args: {},
    resolve: async (obj, args, context) => {
        let room = await Room.find({private: false})
            .sort([['_createdAt', -1]]);
        if (room) {
            await room.forEach((data, index) => {
                data.isUserIn = hasUser(data.users, context.user);
                room[index] = data;
            });
        }
        return room;
    },
};
