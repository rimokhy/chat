import {GraphQLID, GraphQLList, GraphQLNonNull} from 'graphql';

import GraphQLChannel from '../GQL/model/channel';
import {Channel} from '../models'
import {hasUser} from "../subscriptions/roomEvent";

export default {
    type: new GraphQLList(new GraphQLNonNull(GraphQLChannel)),
    args: {
        room: {
            type: new GraphQLNonNull(GraphQLID),
        },
    },
    resolve: async (obj, args, context) => {
        let channel = await Channel.find()
            .and([{users: {"$in": [context.user._id]}}, {room: args.room}])
            .sort([['_createdAt', -1]]);
        if (channel) {
            if (channel) {
                await channel.forEach((data, index) => {
                    data.isUserIn = true;
                    channel[index] = data;
                });
            }
        }
        return channel;

    },
};
