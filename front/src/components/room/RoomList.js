import React, {Component} from 'react';
import {connect} from "react-redux";
import Actions from "../../services/redux/actions";
import './RoomList.css'
import Room from "./Room";
import gql from "graphql-tag";

const GQL_MSG_SUBSCRIPTION = gql`
subscription messageEvent($channel: ID!) {
  messageEvent(channel: $channel) {
       content
  }
  }
`;

class RoomList extends Component {
    componentDidMount() {
        console.log('Mounting room :)');
        this.subscribe();
    }

    subscribe = () =>
        this.props.subscriber({
            document: GQL_MSG_SUBSCRIPTION,
            variables: {channel: '12'},
            updateQuery: (prev, {subscriptionData}) => {
                if (!subscriptionData.data) {
                    return prev;
                }
                return Object.assign({}, prev, {
                    messages: [subscriptionData.data.messageEvent, ...prev.messages]
                });
            }
        });

    render() {
        return <div>
            {this.props.data && this.props.data.messages && this.props.data.messages.map(msg => (<Room msg={msg}/>))}
        </div>
    }
}

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {
        triggerError: (bool, msg) => {
            dispatch(Actions.loginFailed(bool, msg));
        },
        navigate: (uri, obj) => {
            dispatch(Actions.navigation(uri, obj));
        },
        loadingEvent: (bool) => {
            dispatch(Actions.loading(bool));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);
