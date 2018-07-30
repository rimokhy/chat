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
                return Object.assign({}, prev, {
                    rooms: [subscriptionData.data.roomEvent, ...prev.rooms]
                });
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
