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
        const room = await Room.findOne().and([{
            users: {
                "$not": {
                    "$in": [context.user._id]
                }
            }
        }, {_id: args.room}]);

        if (room === null) {
            throw HttpError.UnprocessableEntity('Room doesn\'t exist or user found in room');
        }
        if (room.private) {
            throw HttpError.UnprocessableEntity('Room is private');
        }
        room.users.push(context.user._id);
        room.save();
        room.isUserIn = true;
        room.operation = Operation.UserJoin;
        pubsub.publish(Events.room, room);
        //TODO: trigger msg on channel general of room
        return room;
    }
};
