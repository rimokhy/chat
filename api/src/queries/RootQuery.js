// @flow

import { GraphQLObjectType } from "graphql";
import Cat from "./Cat";

export default new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root Query',
  fields: {
    cat: Cat,
  },
});
