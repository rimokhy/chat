import {GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import base from './base';
import user from './user';

export default new GraphQLObjectType({
    name: 'User',
    fields: Object.assign({
        email: {
            type: new GraphQLNonNull(GraphQLString),
        },
        username: {
            type: new GraphQLNonNull(GraphQLString),
        },
        avatar: {
            type: GraphQLString,
        }
    }, base)
});
