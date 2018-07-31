import {GraphQLBoolean, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import base from './base';
import user from './user';
import room from './room';

export default new GraphQLObjectType({
    name: 'Channel',
    fields: Object.assign({
        title: {
            type: new GraphQLNonNull(GraphQLString),
        },
        room: {
            type: room
        },
        users: {
            type: new GraphQLList(user),
        },
        isUserIn: {
            type: new GraphQLNonNull(GraphQLBoolean),
        }
    }, base)
});
