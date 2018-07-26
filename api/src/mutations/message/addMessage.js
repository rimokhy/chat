import {GraphQLNonNull, GraphQLString} from 'graphql';
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
        channel: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    resolve: async (obj, args, context) => {
        const payload = { content: args.content, channel: args.channel, createdBy: context.user._id };
        const message = await new Message(payload).save();

        message.operation = Operation.Create;
        pubsub.publish(Events.message, message);
        return message;
    },
};
