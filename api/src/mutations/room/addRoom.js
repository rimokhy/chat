import {GraphQLBoolean, GraphQLNonNull, GraphQLString} from 'graphql';
import {pubsub} from '../../config';
import {GQLRoom} from '../../GQL/model/index';
import {Room} from '../../models';
import Events from '../../events';
import {Operation} from "./index";
import mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId;

export default {
    type: GQLRoom,
    args: {
        title: {
            type: new GraphQLNonNull(GraphQLString),
        },
        private: {
            type: GraphQLBoolean
        }
    },
    resolve: async (obj, args, context) => {
        const payload = { title: args.title, users: [context.user._id] };

        if (args.private) {
            payload.private = args.private;
        }
        let room = await new Room(payload).save();
        room = await Room.findById(room._id).populate('users');
        room.operation = Operation.Create;
        pubsub.publish(Events.room, room);
        return room;
    },
};
