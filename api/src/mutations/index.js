import {GraphQLObjectType} from 'graphql';
import {addMessage, updateMessage, removeMessage} from './message';
import {addRoom, removeRoom, joinRoom, leaveRoom} from './room'
import {addChannel} from './channel';
import joinChannel from "./channel/joinChannel";
import leaveChannel from "./channel/leaveChannel";

export default new GraphQLObjectType({
    name: 'Mutation',
    description: 'Mutation',
    fields: {
        addMessage,
        updateMessage,
        removeMessage,
        addRoom,
        removeRoom,
        joinRoom,
        leaveRoom,
        addChannel,
        joinChannel,
        leaveChannel
    }
});
