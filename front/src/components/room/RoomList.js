import React, {Component} from 'react';
import './css/RoomList.css'
import Room from "./Room";
import {List} from "@material-ui/core/index";
import gql from "graphql-tag";
import {Link} from "react-router-dom";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import Add from "@material-ui/icons/es/Add";

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
                if (!subscriptionData.data) {
                    return prev;
                }
                const room = subscriptionData.data.roomEvent;

                switch (room.operation) {
                    case 'deleted':
                        break;
                    case 'userJoined':
                        return Object.assign({}, prev, {
                            rooms: [subscriptionData.data.roomEvent, ...prev.rooms]
                        });
                    case 'userLeft':
                        return prev;
                    default:
                        return Object.assign({}, prev, {
                            rooms: [room, ...prev.publicRooms]
                        });
                }
            }
        });

    render() {
        return <div>
            <List>
                <Link to="/room">
                    <ListItem button>
                        <Avatar>
                            <Add/>
                        </Avatar>
                    </ListItem>
                </Link>
                {this.props.data && this.props.data.rooms && this.props.data.rooms.map(room => (<Room room={room} showAction={this.props.showAction}/>))}
            </List>
        </div>
    }
}
