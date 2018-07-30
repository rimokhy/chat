import React, {Component} from 'react';
import Message from "./Message";
import {List} from "@material-ui/core/index";
import gql from "graphql-tag";

class MessageList extends Component {
    componentDidMount() {
        this.subscribe();
    }

    /*

        static add() {
            return gql`
            mutation addMessage($title: String!) {
              addMessage(title: $title) {
               id
             }
              }`;
        }
    */

    static query() {
        return gql`
                query messages($channel: ID!) {
                  messages(channel: $channel) {
                   id
                   content
                 }
            }`;
    }

    static subscription() {
        return gql`
                subscription messageEvent($channel: ID!) {
                  messageEvent(channel: $channel) {
                    id
                    content
                  }
                }`;
    }

    subscribe = () =>
        this.props.subscriber({
            document: MessageList.subscription(),
            variables: this.props.fetchVars,
            updateQuery: (prev, {subscriptionData}) => {
                console.log('Msg event');
                if (!subscriptionData.data) {
                    return prev;
                }
                return Object.assign({}, prev, {
                    messages: [...prev.messages, subscriptionData.data.messageEvent]
                });
            }
        });

    render() {
        return <div>
            <List dense={true}>
                {this.props.data && this.props.data.messages && this.props.data.messages.map(message => (
                    <Message message={message} channel={this.props.fetchVars.channel}/>))}
            </List>
        </div>
    }
}

export default MessageList