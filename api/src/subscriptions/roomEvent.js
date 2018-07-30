import {withFilter} from 'graphql-subscriptions';
import {pubsub} from '../config';
import {GQLRoom} from '../GQL/model/index';
import Events from '../events';

export default {
    type: GQLRoom,
    args: {
    },
    resolve: payload => {
        return payload;
    },
    subscribe: withFilter(
        () => pubsub.asyncIterator(Events.room),
        (payload, args, context) => {
            const users = payload.users;

            if (users) {
                for (let i = 0; i < users.length; i++) {
                    if (String(users[i]._id) === String(context.user._id)) {
                        return true;
                    }
                }
            }
            return true;
        }
    ),
};
