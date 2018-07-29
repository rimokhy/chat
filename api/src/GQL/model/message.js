import {GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import {GraphQLDateTime} from 'graphql-iso-date';
import base from './base';
import user from "./user";
import channel from "./channel";

export default new GraphQLObjectType({
    name: 'Message',
    fields: Object.assign({
        content: {
            type: new GraphQLNonNull(GraphQLString),
        },
        channel: {
            type: new GraphQLNonNull(channel),
        },
        createdBy: {
            type: new GraphQLNonNull(user),
        }
    }, base)
});
