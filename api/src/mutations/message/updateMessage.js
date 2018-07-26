import {GraphQLID, GraphQLNonNull, GraphQLString} from 'graphql';
import {pubsub} from '../../config';
import {GQLMessage} from '../../GQL/model/index';
import {Message} from '../../models';
import Events from '../../events';
import {Operation} from "./index";

export default {
    type: GQLMessage,
    args: {
        content: {
            type: new GraphQLNonNull(GraphQLString),
        },
        message: {
            type: new GraphQLNonNull(GraphQLID),
        },
    },
    resolve: async (obj, args) => {
        const payload = {
            content: args.content,
            _updatedAt: Date.now(),
        };
        const message = await Message.findByIdAndUpdate(args.message, payload, { new: true });
        message.operation = Operation.Update;

        pubsub.publish(Events.message, message);
        return message;
    },
};
