import {GraphQLID, GraphQLNonNull} from 'graphql';
import {pubsub} from '../../config';
import {GQLChannel} from '../../GQL/model/index';
import {Channel} from '../../models';
import Events from '../../events';
import {Operation} from "./index";
import HttpError from "../../GQL/httpErrors";

export default {
    type: GQLChannel,
    args: {
        channel: {
            type: new GraphQLNonNull(GraphQLID),
        }
    },
    resolve: async (obj, args, context) => {
        const channel = await Channel.findOne().and([{users: {"$in": [context.user._id]}}, {_id: args.channel}]);

        if (channel === null) {
            throw HttpError.UnprocessableEntity('Channel doesn\'t exist or user not found in it');
        }
        channel.users = channel.users.filter(data => String(data._id) !== String(context.user._id));
        channel.save();
        channel.isUserIn = false;
        channel.operation = Operation.UserLeft;
        pubsub.publish(Events.channel, channel);
        //TODO: trigger msg on channel
        return channel;
    }
};
