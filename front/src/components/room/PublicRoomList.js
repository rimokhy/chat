import React, {Component} from 'react';
import Room from "./Room";
import {List} from "@material-ui/core/index";
import gql from "graphql-tag";
import {ListItemSecondaryAction} from "@material-ui/core/es/index";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Input from "@material-ui/core/es/Input/Input";
import Favorite from "@material-ui/icons/es/Favorite";

export default class PublicRoomList extends Component {
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
                  publicRooms {
                   title
                   id
                   isUserIn
                   _createdAt
                  }
                  }
                `;
    }

    static subscription() {
        return gql`
            subscription roomEvent($private: Boolean!) {
              roomEvent(private: $private) {
                   id
                   title
                   isUserIn
                   _createdAt
                   isUserIn
                   operation
              }
              }
            `;
    }

    subscribe = () =>
        this.props.subscriber({
            document: PublicRoomList.subscription(),
            variables: {private: true},
            updateQuery: (prev, {subscriptionData}) => {
                if (!subscriptionData.data) {
                    return prev;
                }
                const room = subscriptionData.data.roomEvent;

                switch (room.operation) {
                    case 'deleted':
                        break;
                    case 'userJoined':
                        return Object.assign({}, prev, {
                            publicRooms: [subscriptionData.data.roomEvent, ...prev.publicRooms]
                        });
                    case 'userLeft':
                        return prev;
                    default:
                        return Object.assign({}, prev, {
                            publicRooms: [room, ...prev.publicRooms]
                        });
                }
            }
        });

    render() {
        return <div>
            <List>
                {this.props.data && this.props.data.publicRooms && this.props.data.publicRooms.map(room => (
                    <Room room={room} showAction>
                    </Room>
                ))}
            </List>
        </div>
    }
}
