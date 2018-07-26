import request from 'request-promise';
import {Room} from '../src/models';

export const TOKEN_TEST = 'test.token';
const testInit = () => {
    const ROOM_TO_UPDATE = new Room({title: 'To Update'}).save();
    const ROOM_TO_DELETE = new Room({title: 'To Delete'}).save();
    const ROOM_TO_JOIN = new Room({title: 'To Join'}).save();
    const ROOM_TO_LEAVE = new Room({title: 'To Leave'}).save();

    return {
        room: {
            ROOM_TO_UPDATE,
            ROOM_TO_DELETE,
            ROOM_TO_JOIN,
            ROOM_TO_LEAVE
        }
    }
};

if ()
export const graphqlRequest = async (gqlRequest, conf) => {
    const options = {
        headers: {
            'User-Agent': 'Aos-Node-Js',
            'Content-Type': 'application/json',
            accept: '*/*',
        },
        uri: 'http://localhost:8080/graphql',
        method: 'POST',
        body: JSON.stringify({query: gqlRequest})
    };
    if (conf && conf.auth) {
        Object.assign(options.headers, {Authorization: conf.auth})
    }
    if (conf && conf.statusThrow === false) {
        Object.assign(options, {simple: false, resolveWithFullResponse: true})
    }
    return request(options);
};