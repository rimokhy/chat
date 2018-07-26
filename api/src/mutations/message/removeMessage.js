import {GraphQLID, GraphQLNonNull} from 'graphql';
import {pubsub} from '../../config';
import {GQLMessage} from '../../GQL/model/index';
import {Message} from '../../models';
import Events from '../../events';
import {Operation} from "./index";

export default {
    type: GQLMessage,
    args: {
        message: {
            type: new GraphQLNonNull(GraphQLID),
        },
    },
    resolve: async (obj, args) => {
        const message = await Message.findByIdAndRemove(args.message);
        message.operation = Operation.Delete;

        pubsub.publish(Events.message, message);
        return message;
    },
};
