import {GraphQLID, GraphQLNonNull} from 'graphql';
import {pubsub} from '../../config';
import {GQLRoom} from '../../GQL/model/index';
import {Message, Room} from '../../models';
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
        try {
            const room = await Message.findById(args.room);
            let index;

            if ((index = room.users.indexOf(context.user)) !== -1) {
                delete room.users[index];
                room.save();
                room.users = [context.user];
            }
            room.operation = Operation.UserLeft;
            pubsub.publish(Events.room, room);
            return room;
        } catch (err) {
            throw HttpError.UnprocessableEntity('Room doesn\'t exist');
        }
    },
};
