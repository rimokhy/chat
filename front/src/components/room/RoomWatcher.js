import React, {Component} from 'react';
import {connect} from "react-redux";
import Actions from "../../services/redux/actions";
import './RoomWatcher.css'
import gql from 'graphql-tag'
import {Auth} from '../../services/AuthService'
import {Mutation, Query, Subscription} from "react-apollo";
import "./RoomWatcher.css";
import RoomList from './RoomList'

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


class RoomWatcher extends Component {
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
                <Mutation mutation={GQL_ROOM}>
                    {(addTodo, response) => (
                        <div>
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    console.log(input.value);
                                    addTodo({
                                        variables: {
                                            channel: '12',
                                            content: 'Haha',
                                            createdBy: Auth.token.user._id
                                        }
                                    }).then(data => {
                                        console.log(data);
                                    }).catch(err => {
                                        console.log(JSON.stringify(err));
                                    });
                                    input.value = "";
                                }}
                            >
                                <input
                                    ref={node => {
                                        input = node;
                                    }}
                                />
                                <button type="submit">Add Todo</button>
                            </form>
                        </div>
                    )}
                </Mutation>
                <Query query={GQL_ROOMS_QUERY} variables={{channel: '12'}}>

                    {({ subscribeToMore, ...result }) => (
                        <RoomList
                            {...result}
                            subscribeToNewComments={() =>
                                subscribeToMore({
                                    document: GQL_MSG_SUBSCRIPTION,
                                    variables: { channel: '12' },
                                    updateQuery: (prev, { subscriptionData }) => {
                                        if (!subscriptionData.data) {
                                            return prev;
                                        }
                                        return Object.assign({}, prev, {
                                            messages: [subscriptionData.data.messageEvent, ...prev.messages]
                                        });
                                    }
                                })
                            }
                        />
                    )}
                </Query>
                {/*

                {({subscribeToMore, ...result}) => {
                        console.log('Render query start');
                        subscribeToMore({
                            document: GQL_MSG_SUBSCRIPTION,
                            variables: {channel: '12'},
                            updateQuery: (prev, data) => {
                                console.log(data);
                                const subscriptionData = data.subscriptionData;
                                if (!subscriptionData.data) {
                                    return prev;
                                }
                                return Object.assign({}, prev, {
                                    messages: [subscriptionData.data.messageEvent, ...prev.messages]
                                });
                            }
                        });
                        console.log('Render query end');
                        console.log('rnder');
                        console.log(result.data);
                        if (result && result.data && result.data.messages) {
                            return result.data.messages.map(msg => (
                                <div>
                                    <span>{msg.content}</span>
                                </div>
                            ));
                        }
                        return <div/>
                    }}


                <Subscription
                    subscription={GQL_MSG_SUBSCRIPTION}
                    variables={{ channel: '12' }}
                    shouldResubscribe={true}
                >
                    {({ data, loading }) => (
                        <h4>New comment: {!loading && this.test(data) && JSON.stringify(data)}</h4>
                    )}
                </Subscription>
*/}
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

export default connect(mapStateToProps, mapDispatchToProps)(RoomWatcher);
