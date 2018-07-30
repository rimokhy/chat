import {GraphQLID, GraphQLNonNull, GraphQLString} from 'graphql';
import {pubsub} from '../../config';
import {GQLChannel} from '../../GQL/model/index';
import {Channel, Room} from '../../models';
import Events from '../../events';
import {Operation} from "./index";
import httpErrors from "../../GQL/httpErrors";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;
export default {
    type: GQLChannel,
    args: {
        title: {
            type: new GraphQLNonNull(GraphQLString),
        },
        room: {
            type: new GraphQLNonNull(GraphQLID),
        }
    },
    resolve: async (obj, args, context) => {
        const payload = { title: args.title, users: [context.user._id], room: args.room };
        const room = await Room.findOne({_id: payload.room});
        if (!room) {
            throw httpErrors.UnprocessableEntity('Cant create chanel: Room doesnt exist');
        }
        let channel = await new Channel(payload).save();
        channel = await Channel.findById(channel._id).populate('users', 'email username _id');
        channel.operation = Operation.Create;
        pubsub.publish(Events.channel, channel);
        return channel;
    },
};
