import { GraphQLObjectType } from "graphql";
import messages from "./messages";
import rooms from "./rooms";
import channels from "./channels";
import publicRooms from "./publicRooms";
import channelsRooms from "./channelsRooms";

export default new GraphQLObjectType({
  name: 'Query',
  description: 'Query',
  fields: {
      messages,
      rooms,
      publicRooms,
      channels,
      channelsRooms
  },
});
