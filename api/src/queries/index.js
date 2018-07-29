import { GraphQLObjectType } from "graphql";
import messages from "./messages";

export default new GraphQLObjectType({
  name: 'Query',
  description: 'Query',
  fields: {
      messages
  },
});
