import React, {Component} from 'react';
import {List} from "@material-ui/core/index";
import Channel from "./Channel";
import gql from "graphql-tag";

class ChannelList extends Component {
    componentDidMount() {
        this.subscribe();
    }

    /*

        static add() {
            return gql`
            mutation addChannel($title: String!) {
              addChannel(title: $title) {
               id
             }
              }`;
        }
    */

    static query() {
        return gql`
                query channels($room: ID!) {
                  channels(room: $room) {
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
            document: ChannelList.subscription(),
            variables: this.props.fetchVars,
            updateQuery: (prev, {subscriptionData}) => {
                console.log('Channel event rcv');
                if (!subscriptionData.data) {
                    return prev;
                }
                return Object.assign({}, prev, {
                    channels: [subscriptionData.data.channelEvent, ...prev.channels]
                });
            }
        });

    render() {
        console.log('Channel list rendered');
        console.log(this.props.data);
        return <div>
            <List>
                {this.props.data && this.props.data.channels && this.props.data.channels.map(channel => (
                    <Channel channel={channel} room={this.props.fetchVars.room}/>))}
            </List>
        </div>
    }
}

export default ChannelList