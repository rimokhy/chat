import React, {Component} from 'react';
import Message from "./Message";
import {List} from "@material-ui/core/index";
import gql from "graphql-tag";
import ReactDOM from 'react-dom'

class MessageList extends Component {
    componentDidMount() {
        this.subscribe();
    }

    static query() {
        return gql`
                query messages($channel: ID!) {
                  messages(channel: $channel) {
                   id
                   content
                   _createdAt
                   _updatedAt
                   createdBy { username id avatar }
                 }
            }`;
    }

    static subscription() {
        return gql`
                subscription messageEvent($channel: ID!) {
                  messageEvent(channel: $channel) {
                  id
                  content
                   _createdAt
                   _updatedAt
                   createdBy { username id avatar }
                  }
                }`;
    }

    componentDidUpdate() {
        const elem = ReactDOM.findDOMNode(this.refs.msgContainer);
        elem.scrollTo(0, elem.scrollHeight);

    }

    subscribe = () =>
        this.props.subscriber({
            document: MessageList.subscription(),
            variables: this.props.fetchVars,
            updateQuery: (prev, {subscriptionData}) => {
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
            <List ref={"msgContainer"} style={{maxHeight: 500, overflow: 'auto', overflowX: 'hidden'}}>
                {this.props.data && this.props.data.messages && this.props.data.messages.map(message => (
                    <Message message={message} channel={this.props.fetchVars.channel}/>))}
            </List>
        </div>
    }
}

export default MessageList