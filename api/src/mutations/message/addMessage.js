import {GraphQLID, GraphQLNonNull, GraphQLString} from 'graphql';
import {pubsub} from '../../config';
import {GQLMessage} from '../../GQL/model/index';
import {Message, Channel} from '../../models';
import Events from '../../events';
import {Operation} from "./index";
import mongoose from "mongoose";

const {ObjectId} = mongoose.Schema.Types;
export default {
    type: GQLMessage,
    args: {
        content: {
            type: new GraphQLNonNull(GraphQLString),
        },
        channel: {
            type: new GraphQLNonNull(GraphQLID),
        },
        createdBy: {
            type: new GraphQLNonNull(GraphQLID),
        },
    },
    resolve: async (obj, args, context) => {
        const channel = await Channel.findById(args.channel);
        conso
        const payload = { content: args.content, channel: new ObjectId(channel._id), createdBy: args.createdBy };
        let message = await new Message(payload).save();

        console.log(message);
        message = await Message.findById(message._id).populate('createdBy').populate('channel');
        console.log(message);
        message.operation = Operation.Create;
        pubsub.publish(Events.message, message);
        return message;
    },
};
