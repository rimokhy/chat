import {withFilter} from 'graphql-subscriptions';
import {pubsub} from '../config';
import {GQLChannel} from '../GQL/model/index';
import Events from '../events';
import {GraphQLID, GraphQLNonNull, GraphQLBoolean} from "graphql";

export default {
    type: GQLChannel,
    args: {
        room: {
            type: new GraphQLNonNull(GraphQLID),
        },
        fetchRoom: {
            type: GraphQLBoolean,
        },
    },
    resolve: payload => {
        return payload;
    },
    subscribe: withFilter(
        () => pubsub.asyncIterator(Events.channel),
        (payload, args, context) => {
            const users = payload.users;
            if (args.fetchRoom && args.fetchRoom === true) {
                return true;
            }
            if (users) {
                for (let i = 0; i < users.length; i++) {
                    if (String(users[i]._id) === String(context.user._id)) {
                        return (String(payload.room) === String(args.room));
                    }
                }
            }
            return false;
        }
    ),
};
