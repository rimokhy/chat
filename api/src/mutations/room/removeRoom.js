import {GraphQLBoolean, GraphQLID, GraphQLNonNull} from 'graphql';
import {pubsub} from '../../config';
import {GQLMessage} from '../../GQL/model/index';
import {Room} from '../../models';
import Events from '../../events';
import {Operation} from "./index";
import HttpError from "../../GQL/httpErrors";

export default {
    type: GQLMessage,
    args: {
        room: {
            type: new GraphQLNonNull(GraphQLID),
        }
    },
    resolve: async (obj, args, context) => {
        try {
            const room = await Room.findByIdAndRemove(args.room);

            room.operation = Operation.Delete;
            pubsub.publish(Events.room, room);
            return room;
        } catch (err) {
            throw HttpError.UnprocessableEntity('Room doesn\'t exist')
        }
    }
};
