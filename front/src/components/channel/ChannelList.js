import React, {Component} from 'react';
import {List} from "@material-ui/core/index";
import Channel from "./Channel";
import gql from "graphql-tag";

class ChannelList extends Component {
    componentDidMount() {
        this.subscribe();
    }

    static query() {
        return gql`
                query channels($room: ID!) {
                  channels(room: $room) {
                   id
                   title
                   isUserIn
                 }
            }`;
    }

    static subscription() {
        return gql`
                subscription channelEvent($room: ID!) {
                  channelEvent(room: $room) {
                    id
                    isUserIn
                    title
                    operation
                  }
                }`;
    }

    isValid = () => {
        return this.props.data && this.props.data.channels;
    }
    subscribe = () =>
        this.props.subscriber({
            document: ChannelList.subscription(),
            variables: this.props.fetchVars,
            updateQuery: (prev, {subscriptionData}) => {
                if (!subscriptionData.data) {
                    return prev;
                }
                const channel = subscriptionData.data.channelEvent;
                switch (channel.operation) {
                    case 'deleted':
                        break;
                    case 'userJoined':
                        return Object.assign({}, prev, {
                            channels: [channel, ...prev.channels]
                        });
                    case 'userLeft':
                        return prev;
                    default:
                        return Object.assign({}, prev, {
                            channels: [channel, ...prev.channels]
                        });
                }
            }
        });

    render() {
        return <div>
            <List>
                {this.isValid() && this.props.data.channels.map(channel => (
                    <Channel channel={channel} room={this.props.fetchVars.room}/>))}
            </List>
        </div>
    }
}

export default ChannelList