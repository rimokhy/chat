import React, {Component} from 'react';
import {connect} from "react-redux";
import Actions from "../../services/redux/actions";
import './Home.css'
import gql from 'graphql-tag'
import {Auth} from '../../services/AuthService'
import {Mutation, Query, Subscription} from "react-apollo";

const GQL_ROOM = gql`
mutation addMessage($content: String!, $channel: ID!) {
  addMessage(content: $content, channel: $channel) {
   id
   content
   _createdAt
   _updatedAt
   operation
  }
  }`;

const GQL_ROOMS_QUERY = gql`
query messages($channel: ID!) {
  messages(channel: $channel) {
   content
  }
  }
`;

const GQL_MSG_SUBSCRIPTION = gql`
subscription messageEvent($channel: ID!) {
  messageEvent(channel: $channel) {
       content
  }
  }
`;


class Home extends Component {
    state = {messages: []};


    test(data) {
        console.log('Event refresh');
        console.log(data);
        return true;
    }

    onFetchedData = data => {
        console.log(data);
    };

    render() {
        let input;

        return (
            <div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
