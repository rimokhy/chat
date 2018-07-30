import React, {Component} from 'react';
import './css/RoomList.css'
import Room from "./Room";
import {List} from "@material-ui/core/index";
import gql from "graphql-tag";

export default class RoomList extends Component {
    componentDidMount() {
        this.subscribe();
    }

    /*

        static add() {
            return gql`
            mutation addRoom($title: String!) {
              addRoom(title: $title) {
               id
             }
              }`;
        }
    */

    static query() {
        return gql`
                query {
                  rooms {
                   title
                   id
                   _createdAt
                   isUserIn
                   operation
                  }
                  }
                `;
    }

    static subscription() {
        return gql`
            subscription {
              roomEvent {
                   id
                   title
                   _createdAt
                   isUserIn
                   operation
              }
              }
            `;
    }

    subscribe = () =>
        this.props.subscriber({
            document: RoomList.subscription(),
            updateQuery: (prev, {subscriptionData}) => {
                console.log('RoomList:');
                if (!subscriptionData.data) {
                    return prev;
                }
                const room = subscriptionData.data.roomEvent;
                console.log('RoomList: ' + room.operation);
                switch (room.operation) {
                    case 'deleted':
                        break;
                    case 'userJoined':
                        return Object.assign({}, prev, {
                            rooms: [subscriptionData.data.roomEvent, ...prev.rooms]
                        });
                    case 'userLeft':
                        return Object.assign({}, prev, {
                            rooms: [...prev.rooms.filter(data => room.id !== data.id)]
                        });
                    default:
                        return Object.assign({}, prev, {
                            rooms: [subscriptionData.data.roomEvent, ...prev.rooms]
                        });
                }
            }
        });

    render() {
        return <div>
            <List>
                {this.props.data && this.props.data.rooms && this.props.data.rooms.map(room => (<Room room={room}/>))}
            </List>
        </div>
    }
}
