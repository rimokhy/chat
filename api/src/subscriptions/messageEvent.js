import {GraphQLNonNull, GraphQLID} from 'graphql';
import {withFilter} from 'graphql-subscriptions';
import {pubsub} from '../config';
import {GQLMessage} from '../GQL/model/index';
import Events from '../events';

export default {
    type: GQLMessage,
    args: {
        channel: {
            type: new GraphQLNonNull(GraphQLID),
        },
    },
    resolve: payload => {
        return payload;
    },
    subscribe: withFilter(
        () => pubsub.asyncIterator(Events.message),
        (payload, args, context) => {
            return (String(payload.channel) === String(args.channel));
        }
    ),
};
