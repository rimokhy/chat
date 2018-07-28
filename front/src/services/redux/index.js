import {createStore} from 'redux';

const eventHandler = (state, action) => {
    console.log(action.type);
    return action.callback ? action.callback(...action.args) : {};
};

export const store = createStore(eventHandler);
