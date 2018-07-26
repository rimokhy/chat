import {GraphQLID, GraphQLNonNull} from 'graphql';
import {pubsub} from '../../config';
import {GQLRoom} from '../../GQL/model/index';
import {Message, Room} from '../../models';
import Events from '../../events';
import {Operation} from "./index";
import HttpError, {GQLValidationError} from "../../GQL/httpErrors";

export default {
    type: GQLRoom,
    args: {
        room: {
            type: new GraphQLNonNull(GraphQLID),
        }
    },
    resolve: async (obj, args, context) => {
        try {
            const room = await Message.findById(args.room);

            if (room.private) {
                throw HttpError.UnprocessableEntity('Room is private');
            }
            if (room.users.indexOf(context.user) === -1) {
                room.users.push(context.user);
                room.save();
                room.users = [context.user];
            }
            room.operation = Operation.UserJoin;
            pubsub.publish(Events.room, room);
            return room;
        } catch (err) {
            if (err instanceof GQLValidationError) {
                throw err;
            }
            throw HttpError.UnprocessableEntity('Room doesn\'t exist');
        }
    },
};
