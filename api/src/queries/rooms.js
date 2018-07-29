import {GraphQLID} from 'graphql';
import {GraphQLList} from 'graphql';

import GraphQLMessage from '../GQL/model/message';
import {Message} from '../models'

export default {
    type: new GraphQLList(GraphQLMessage),
    args: {
        channel: {
            type: GraphQLID,
        },
    },
    resolve: async (obj, args, context) => {
        return await Message.find({channel: args.channel}).sort([['_createdAt', -1]]).populate('createdBy');
    },
};
