import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {split} from 'apollo-link'
import {WebSocketLink} from 'apollo-link-ws'
import {getMainDefinition} from 'apollo-utilities'

const wsLink = new WebSocketLink({
    uri: 'ws://localhost:8080/subscriptions',
    options: {
        reconnect: true
    }
});

const httpLink = createHttpLink({
    uri: '/graphql'
});

const authLink = setContext((_, {headers}) => {
    let token = localStorage.getItem('token');

    if (token) {
        token = JSON.parse(token);
    }
    return {
        headers: {
            ...headers,
            Authorization: `Bearer ${token.accessToken}`
        }
    }
});

const links = split(({query}) => {
        const {kind, operation} = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription'
    },
    authLink.concat(httpLink),
    wsLink);

export const client = new ApolloClient({
    link: links,
    cache: new InMemoryCache()
});