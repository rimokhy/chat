// @flow

import { GraphQLID } from 'graphql';

import GraphQLCat from '../GQL/model/message';

export default {
  type: GraphQLCat,
  args: {
    id: {
      type: GraphQLID,
    },
  },
  resolve: async (obj, args, context) => {
    const cats = await Cat.find({ _id: id });
    return cats[0];
  },
};
