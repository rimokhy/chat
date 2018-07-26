import {GraphQLNonNull, GraphQLString} from 'graphql';
import {withFilter} from 'graphql-subscriptions';
import {pubsub} from '../config';
import {GQLMessage} from '../GQL/model/index';
import Events from '../events';

export default {
    type: GQLMessage,
    args: {
        channel: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    resolve: payload => payload,
    subscribe: withFilter(
        () => pubsub.asyncIterator(Events.message),
        (payload, args) => payload.channel === args.channel,
    ),
};
