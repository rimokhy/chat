import {GraphQLID, GraphQLNonNull, GraphQLString} from 'graphql';
import {GraphQLDateTime} from 'graphql-iso-date';

export default {
    id: {
        type: new GraphQLNonNull(GraphQLID),
    },
    operation: {
        type: GraphQLString,
    },
    _createdAt: {
        type: new GraphQLNonNull(GraphQLDateTime),
    },
    _updatedAt: {
        type: GraphQLDateTime,
    }
}