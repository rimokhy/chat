import addMessage from './addMessage';
import updateMessage from './updateMessage';
import removeMessage from './removeMessage';

const Operation = {
    Create: 'created',
    Update: 'updated',
    Delete: 'deleted'
};
export { addMessage, updateMessage, removeMessage, Operation }