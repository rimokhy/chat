import { GraphQLSchema } from 'graphql';

import RootQuery from './queries/index';
import Mutation from './mutations';
import Subscription from './subscriptions';

const schemaDefinition = {
  query: RootQuery,
  mutation: Mutation,
  subscription: Subscription,
};

export default new GraphQLSchema(schemaDefinition);

