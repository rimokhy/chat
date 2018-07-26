import {PubSub} from 'graphql-subscriptions';

export const pubsub = new PubSub();
export const PORT = process.env.PORT || 8080;
export const BASE_URI = process.env.BASE_URI || `http://localhost:${PORT}`;
export const WS_BASE_URI = process.env.WS_BAS_URI || BASE_URI.replace(/^https?/, 'ws');
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
export const MONGO_DATABASE_NAME = (process.env.AOS_ENV || '') === 'test' ? 'test' : 'aos';
