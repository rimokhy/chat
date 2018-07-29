import {setContext} from 'apollo-link-context';
import {createHttpLink} from 'apollo-link-http';
import {WebSocketLink} from "apollo-link-ws";
import {split} from 'apollo-link';
import {getMainDefinition} from 'apollo-utilities';
import {ApolloClient} from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";


const httpLink = createHttpLink({ uri: '/graphql' });

const middlewareLink = setContext(() => ({

    headers: {
        authorization: 'Bearer password',
    }
}));

// Create a WebSocket link:
const wsLink = new WebSocketLink({
    uri: `ws://localhost:8080/subscriptions`
});

const cache = new InMemoryCache();

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
    // split based on operation type
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    middlewareLink.concat(httpLink),
);

export const client = new ApolloClient({
    link,
    cache
});