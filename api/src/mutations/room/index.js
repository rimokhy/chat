import addRoom from './addRoom';
import updateRoom from './updateRoom';
import removeRoom from './removeRoom';
import joinRoom from './joinRoom';
import leaveRoom from './leaveRoom';

const Operation = {
    Create: 'created',
    Update: 'updated',
    Delete: 'deleted',
    UserJoin: 'userJoined',
    UserLeft: 'userLeft'
};
export { addRoom, updateRoom, removeRoom, joinRoom, leaveRoom, Operation }