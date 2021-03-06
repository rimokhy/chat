import {GraphQLID, GraphQLNonNull, GraphQLString} from 'graphql';
import {pubsub} from '../../config';
import {GQLMessage} from '../../GQL/model/index';
import {Message, Channel} from '../../models';
import Events from '../../events';
import {Operation} from "./index";
import mongoose from "mongoose";
import httpErrors from "../../GQL/httpErrors";

const {ObjectId} = mongoose.Schema.Types;
export default {
    type: GQLMessage,
    args: {
        content: {
            type: new GraphQLNonNull(GraphQLString),
        },
        channel: {
            type: new GraphQLNonNull(GraphQLID),
        }
    },
    resolve: async (obj, args, context) => {
        const payload = { content: args.content, channel: args.channel, createdBy: context.user._id };
        const chan = await Channel.findOne({_id: payload.channel});
        if (!chan) {
            throw httpErrors.UnprocessableEntity('Cant create message: Channel doesnt exist');
        }
        let message = await new Message(payload).save();

        message = await Message.findById(message._id).populate('createdBy');
        message.operation = Operation.Create;
        pubsub.publish(Events.message, message);
        return message;
    },
};
