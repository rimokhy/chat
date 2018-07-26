import {GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import {GraphQLDateTime} from 'graphql-iso-date';
import base from './base';

export default new GraphQLObjectType({
    name: 'Message',
    fields: Object.assign({
        content: {
            type: new GraphQLNonNull(GraphQLString),
        },
        channel: {
            type: new GraphQLNonNull(GraphQLString),
        },
        createdBy: {
            type: new GraphQLNonNull(GraphQLString),
        }
    }, base)
});
