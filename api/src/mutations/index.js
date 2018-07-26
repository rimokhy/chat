import {GraphQLObjectType} from 'graphql';
import {addMessage, updateMessage, removeMessage} from './message';
import {addRoom, updateRoom, removeRoom, joinRoom, leaveRoom} from './room'

export default new GraphQLObjectType({
    name: 'Mutation',
    description: 'Mutation',
    fields: {
        addMessage,
        updateMessage,
        removeMessage,
        addRoom,
        updateRoom,
        removeRoom,
        joinRoom,
        leaveRoom
    }
});
