import {GraphQLID, GraphQLList, GraphQLNonNull} from 'graphql';

import GraphQLChannel from '../GQL/model/channel';
import {Channel} from '../models'

export default {
    type: new GraphQLList(GraphQLChannel),
    args: {
        room: {
            type: new GraphQLNonNull(GraphQLID),
        },
    },
    resolve: async (obj, args, context) => {
        return await Channel.find()
            .and([{users: {"$in": [context.user._id]}}, {room: args.room}])
            .sort([['_createdAt', -1]]);
    },
};
