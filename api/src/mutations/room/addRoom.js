import {GraphQLBoolean, GraphQLNonNull, GraphQLString} from 'graphql';
import {pubsub} from '../../config';
import {GQLRoom} from '../../GQL/model/index';
import {Room} from '../../models';
import Events from '../../events';
import {Operation} from "./index";
import HttpError from "../../GQL/httpErrors";

export default {
    type: GQLRoom,
    args: {
        title: {
            type: new GraphQLNonNull(GraphQLString),
        },
        private: {
            type: new GraphQLNonNull(GraphQLBoolean)
        }
    },
    resolve: async (obj, args, context) => {
        const payload = { title: args.title, users: [context.user._id], private: args.private };
        try {
            let room = await new Room(payload).save();

            room = await Room.findById(room._id).populate('users', 'email username _id');
            room.operation = Operation.Create;
            room.isUserIn = true;
            pubsub.publish(Events.room, room);
            return room;
        } catch (e) {
            throw HttpError.UnprocessableEntity('Room exists');
        }
    },
};
