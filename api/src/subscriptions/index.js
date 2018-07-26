// @flow

import { GraphQLObjectType } from 'graphql';

import messageEvent from './messageEvent';

export default new GraphQLObjectType({
  name: 'Subscription',
  description: 'Subscription',
  fields: {
    messageEvent,
  },
});
