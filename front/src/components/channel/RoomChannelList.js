import React, {Component} from 'react';
import {List} from "@material-ui/core/index";
import Channel from "./Channel";
import gql from "graphql-tag";

class RoomChannelList extends Component {
    componentDidMount() {
        this.subscribe();
    }

    static query() {
        return gql`
                query channelsRooms($room: ID!) {
                  channelsRooms(room: $room) {
                   id
                   title
                   operation
                    isUserIn
                 }
            }`;
    }

    static subscription() {
        return gql`
                subscription channelEvent($room: ID!, $fetchRoom: Boolean) {
                  channelEvent(room: $room, fetchRoom: $fetchRoom) {
                    id
                    title
                    operation
                    isUserIn
                  }
                }`;
    }

    subscribe = () =>
        this.props.subscriber({
            document: RoomChannelList.subscription(),
            variables: {
                room: this.props.fetchVars.room,
                fetchRoom: true
            },
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
                            channelsRooms: [channel, ...prev.channelsRooms]
                        });
                    case 'userLeft':
                        return prev;
                    default:
                        return Object.assign({}, prev, {
                            channelsRooms: [channel, ...prev.channelsRooms]
                        });
                }
            }
        });

    render() {
        return <div>

            <List>
                {this.props.data && this.props.data.channelsRooms && this.props.data.channelsRooms.map(channel => (
                    <Channel channel={channel} room={this.props.fetchVars.room} showAction/>))}
            </List>

        </div>
    }
}

export default RoomChannelList