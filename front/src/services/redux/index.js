import {combineReducers, createStore} from 'redux';
import Actions from './actions';

const eventHandler = actions => {
    return (state, action) => {
        if (actions.type !== action.type) {
            return state === undefined ? {} : state;
        }
        return action.callback ? action.callback(state, ...action.args) : {};
    };
};

const makeReducers = () => {
    const obj = {};

    Object.keys(Actions).forEach(key => {
        obj[Actions[key]().type] = eventHandler(Actions[key]())
    });
    return combineReducers(obj);
};

export const store = createStore(makeReducers());
