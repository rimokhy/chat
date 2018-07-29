import gql from "graphql-tag";

const addRoom = gql`
mutation addMessage($content: String!, $channel: ID!) {
  addMessage(content: $content, channel: $channel) {
   id
   content
   _createdAt
   _updatedAt
   operation
  }
  }`;

const messages = gql`
query messages($channel: ID!) {
  messages(channel: $channel) {
   content
  }
  }
`;

const messageEvent = gql`
subscription messageEvent($channel: ID!) {
  messageEvent(channel: $channel) {
       content
  }
  }
`;

export default {
    addRoom,
    messages,
    messageEvent
}