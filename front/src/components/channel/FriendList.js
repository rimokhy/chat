import React, {Component} from 'react';
import {List} from "@material-ui/core/index";
import Channel from "./Channel";
import gql from "graphql-tag";

class FriendList extends Component {
    componentDidMount() {
        this.subscribe();
    }

    static query() {
        return gql`
                query friends() {
                  channels() {
                   id
                   title
                 }
            }`;
    }

    static subscription() {
        return gql`
                subscription channelEvent($room: ID!) {
                  channelEvent(room: $room) {
                    id
                    title
                  }
                }`;
    }

    subscribe = () =>
        this.props.subscriber({
            document: FriendList.subscription(),
            variables: this.props.fetchVars,
            updateQuery: (prev, {subscriptionData}) => {
                if (!subscriptionData.data) {
                    return prev;
                }
                return Object.assign({}, prev, {
                    channels: [subscriptionData.data.channelEvent, ...prev.channels]
                });
            }
        });

    render() {
        return <div>
            <List>
                {this.props.data && this.props.data.channels && this.props.data.channels.map(channel => (
                    <Channel channel={channel} room={this.props.fetchVars.room}/>))}
            </List>
        </div>
    }
}

export default FriendList