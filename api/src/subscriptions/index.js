import {GraphQLObjectType} from 'graphql';

import messageEvent from './messageEvent';
import roomEvent from "./roomEvent";
import channelEvent from "./channelEvent";

export default new GraphQLObjectType({
    name: 'Subscription',
    description: 'Subscription',
    fields: {
        messageEvent,
        roomEvent,
        channelEvent
    },
});
