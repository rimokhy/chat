import {GraphQLBoolean, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLList} from 'graphql';
import base from './base';
import user from './user';

export default new GraphQLObjectType({
    name: 'Room',
    fields: Object.assign({
        title: {
            type: new GraphQLNonNull(GraphQLString),
        },
        users: {
            type: new GraphQLList(user),
        },
        private: {
            type: GraphQLBoolean
        }
    }, base)
});
