import {setContext} from 'apollo-link-context';
import {createHttpLink} from 'apollo-link-http';
import {WebSocketLink} from "apollo-link-ws";
import {split} from 'apollo-link';
import {getMainDefinition} from 'apollo-utilities';
import {ApolloClient} from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {Auth} from "./AuthService";

const httpLink = createHttpLink({uri: '/graphql'});

const middlewareLink = setContext(() => ({
    headers: {
        Authorization: `Bearer ${Auth.token ? Auth.token.accessToken : ''}`,
    }
}));

const wsLink = new WebSocketLink({
    uri: `ws://localhost:8080/subscriptions`,
    options: {
        reconnect: true,
        connectionParams: {
            Authorization: `Bearer ${Auth.token ? Auth.token.accessToken : ''}`,
        }
    }
});

const cache = new InMemoryCache();

const link = split(
    ({query}) => {
        const {kind, operation} = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    middlewareLink.concat(httpLink),
);

export const client = new ApolloClient({
    link,
    cache
});