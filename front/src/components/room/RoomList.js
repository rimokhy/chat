import React, {Component} from 'react';
import {connect} from "react-redux";
import Actions from "../../services/redux/actions";
import './Home.css'
import gql from 'graphql-tag'
import {Auth} from '../../services/AuthService'
import {Mutation, Query, Subscription} from "react-apollo";

const GQL_ROOM = gql`
mutation addRoom($title: String!) {
  addRoom(title: $title) {
    title
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
    componentDidMount() {
        console.log('Home comp');

        //.then(response => console.log(response.data.allLinks)).catch(err => console.log(err))

    }

    test(data) {
        console.log('Event refresh');
        console.log(data);
        return true;
    }

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
                    {({subscribeToMore, ...result}) => {
                        console.log('rnder');
                        subscribeToMore({
                            document: GQL_MSG_SUBSCRIPTION,
                            variables: {channel: '12'},
/*
                            shouldResubscribe: true,
*/
                            updateQuery: (prev, {subscriptionData}) => {
                                if (!subscriptionData.data) {
                                    return prev;
                                }
                                return Object.assign({}, prev, {
                                    messages: [subscriptionData.data.messageEvent, ...prev.messages]
                                });
                            }
                        });
                        console.log('rnder');
                        console.log(result);
                        return (<div></div>);
                    }}
                </Query>
                {/*
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
