import {withFilter} from 'graphql-subscriptions';
import {pubsub} from '../config';
import {GQLRoom} from '../GQL/model/index';
import Events from '../events';
import {GraphQLBoolean} from "graphql";
import {Operation} from "../mutations/room";

export const hasUser = (users, user) => {
    if (users) {
        for (let i = 0; i < users.length; i++) {
            if (String(users[i]._id) === String(user._id)) {
                return true;
            }
        }
    }
    return false;
};

export default {
    type: GQLRoom,
    args: {
        private: {
            type: GraphQLBoolean,
        },
    },
    resolve: payload => {
        return payload;
    },
    subscribe: withFilter(
        () => pubsub.asyncIterator(Events.room),
        (payload, args, context) => {
            if (args.private === undefined) {
                const users = payload.users;
                console.log(hasUser(users, context.user))
                if (payload.operation === Operation.UserLeft) {
                    return true;
                }
                return hasUser(users, context.user);
            }
            return args.private === payload.private;
        }
    ),
};
