import {GraphQLNonNull, GraphQLID} from 'graphql';
import {withFilter} from 'graphql-subscriptions';
import {pubsub} from '../config';
import {GQLRoom} from '../GQL/model/index';
import Events from '../events';

export default {
    type: GQLRoom,
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
        () => pubsub.asyncIterator(Events.room),
        (payload, args) => {
            return payload.channel === args.channel
        }
    ),
};
