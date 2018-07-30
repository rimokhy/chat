import { GraphQLObjectType } from "graphql";
import messages from "./messages";
import rooms from "./rooms";
import channels from "./channels";

export default new GraphQLObjectType({
  name: 'Query',
  description: 'Query',
  fields: {
      messages,
      rooms,
      channels
  },
});
