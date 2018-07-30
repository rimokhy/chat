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
        console.log('Return msg subscription');
        return payload;
    },
    subscribe: withFilter(
        () => pubsub.asyncIterator(Events.message),
        (payload, args, context) => {
            console.log((String(payload.channel) === String(args.channel)))
            return (String(payload.channel) === String(args.channel));
        }
    ),
};
