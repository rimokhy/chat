import {GraphQLID, GraphQLNonNull} from 'graphql';
import {pubsub} from '../../config';
import {GQLRoom} from '../../GQL/model/index';
import {Room} from '../../models';
import Events from '../../events';
import {Operation} from "./index";
import HttpError from "../../GQL/httpErrors";

export default {
    type: GQLRoom,
    args: {
        room: {
            type: new GraphQLNonNull(GraphQLID),
        }
    },
    resolve: async (obj, args, context) => {
        const room = await Room.findOne().and([{users: {"$in": [context.user._id]}}, {_id: args.room}]);

        if (room === null) {
            throw HttpError.UnprocessableEntity('Room doesn\'t exist or user not found in it');
        }
        room.users = room.users.filter(data => String(data._id) !== String(context.user._id));
        room.save();
        room.isUserIn = false;
        room.operation = Operation.UserLeft;
        pubsub.publish(Events.room, room);
        //TODO: trigger msg on channel general of room
        return room;
    }
};
