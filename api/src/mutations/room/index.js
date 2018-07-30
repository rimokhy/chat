import addRoom from './addRoom';
import removeRoom from './removeRoom';
import joinRoom from './joinRoom';
import leaveRoom from './leaveRoom';

const Operation = {
    Create: 'created',
    Delete: 'deleted',
    UserJoin: 'userJoined',
    UserLeft: 'userLeft'
};
export { addRoom, removeRoom, joinRoom, leaveRoom, Operation }