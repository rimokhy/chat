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
import {BASE_URI, PORT, WS_BASE_URI} from './config';
import {dbConnect} from "./database";
import {Token} from "./models";

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


app.post('/logout', async (req, res) => {
    await Token.findByIdAndRemove(req.context.token._id);
    res.send({})
});

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


server.listen(PORT, () => {
    new SubscriptionServer(
        {
            execute,
            subscribe,
            schema: Schema,
            onConnect: async (connectionParams, webSocket) => {
                if (!connectionParams.Authorization) {
                    return Promise.reject(new Error('WS: No authentication detected'))
                }
                const token = await parseToken(connectionParams.Authorization);
                const user = await validateToken({accessToken: token});
                return {user, token};
            },
        },
        {
            server,
            path: '/subscriptions',
        },
    );
    console.log(`GraphQL Server is now running on ${BASE_URI}/graphql`);
    console.log(`Subscriptions are running on ${WS_BASE_URI}/subscriptions`);
});
