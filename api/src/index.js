import express from 'express';
import cors from 'cors';
import {createServer} from 'http';
import bodyParser from 'body-parser';
import {graphqlExpress} from 'apollo-server-express';
import expressPlayground from 'graphql-playground-middleware-express';
import {execute, subscribe} from 'graphql';
import {SubscriptionServer} from 'subscriptions-transport-ws';
import OAuth2Endpoint from './security/oauth2/endpoint';
import OAuth2Validation, {parseToken, validateToken} from './security/oauth2';
import AppSecurity from './security'
import Schema from './schema';
import {BASE_URI, WS_BASE_URI, PORT} from './config';
import {dbConnect} from "./database";

dbConnect();

const app = express();
const server = createServer(app);

app.use('*', cors());

app.use(bodyParser.urlencoded({extended: true}));


/**
 * Unauthorized endpoint below
 */

app.get(
    '/playground',
    expressPlayground({
        endpoint: '/graphql',
        subscriptionsEndpoint: `${WS_BASE_URI}/subscriptions`,
    }),
);

AppSecurity(app);
OAuth2Endpoint(app);
OAuth2Validation(app);

/**
 * Authorized endpoint below
 */

app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress(req => {
        const user = req.context.user;

        if (user && 'password' in user) {
            delete user.password;
        }
        return {
            schema: Schema,
            context: {user},
            formatError: (err) => {
                try {
                    const {errorCode, message} = JSON.parse(err.message);
                    return {errorCode, message};
                } catch (e) {
                    return err;
                }
            }
        }
    }));


import {User} from './models'

server.listen(PORT, () => {
    new SubscriptionServer(
        {
            execute,
            subscribe,
            schema: Schema,
/*            onConnect(connectionParams, webSocket) {
                const userPromise = new Promise((res, rej) => {
                    if (connectionParams.authToken) {
                        console.log(connectionParams.authToken);
                        return parseToken(connectionParams.authToken)
                            .then(data => validateToken({accessToken: data}))
                            .then((user) => {
                                console.log(user);
                                return {
                                    currentUser: user,
                                };
                            });
                    } else {
                        rej('No Token');
                    }
                });

                return userPromise.then((user) => {
                    if (user) {
                        return {user: Promise.resolve(user)};
                    }

                    return Promise.reject('No User');
                });
            },
            onOperation(parsedMessage, baseParams) {
                // we need to implement this!!!
                const {subscriptionName, args} = getSubscriptionDetails({
                    baseParams,
                    schema: Schema,
                });

                // we need to implement this too!!!
                return subscriptionLogic[subscriptionName](baseParams, args, baseParams.context);
            },*/
        },
        {
            server,
            path: '/subscriptions',
        },
    );
    console.log(`GraphQL Server is now running on ${BASE_URI}/graphql`);
    console.log(`Subscriptions are running on ${WS_BASE_URI}/subscriptions`);
});
