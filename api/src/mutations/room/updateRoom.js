import {GraphQLBoolean, GraphQLID, GraphQLNonNull, GraphQLString} from 'graphql';
import {pubsub} from '../../config';
import {GQLRoom} from '../../GQL/model/index';
import {Message} from '../../models';
import Events from '../../events';
import {Operation} from "./index";
import HttpError from "../../GQL/httpErrors";

export default {
    type: GQLRoom,
    args: {
        title: {
            type: GraphQLString,
        },
        private: {
            type: GraphQLBoolean
        },
        room: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve: async (obj, args, context) => {
        try {
            const room = await Message.findById(args.room);

            if (args.title) {
                room.title = args.title
            }
            if (args.private) {
                room.private = args.private;
            }
            room.save();
            room.operation = Operation.Update;
            pubsub.publish(Events.room, room);
            return room;
        } catch (err) {
            throw HttpError.UnprocessableEntity('Update error: Room doesn\'t exist');
        }
    },
};
