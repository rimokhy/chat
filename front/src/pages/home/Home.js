import React, {Component} from 'react';
import {connect} from "react-redux";
import Actions from "../../services/redux/actions";
import './Home.css'
import gql from 'graphql-tag'
import {Auth} from '../../services/AuthService'
import {Mutation, Query, Subscription} from "react-apollo";

const GQL_ROOM = gql`
mutation addMessage($content: String!, $channel: ID!, $createdBy: ID!) {
  addMessage(content: $content, channel: $channel, createdBy: $createdBy) {
   id
   content
   _createdAt
   _updatedAt
   operation
   channel {id}
   createdBy { username id }
  }
  }`;

const GQL_ROOMS_QUERY = gql`
query messages($channel: ID!) {
  messages(channel: $channel) {
   id
   content
   _createdAt
   _updatedAt
   createdBy {username}
  }
  }
`;

const GQL_MSG_SUBSCRIPTION = gql`
subscription messageEvent($channel: ID!) {
  messageEvent(channel: $channel) {
       content
    _updatedAt
    content
    channel {title, id}
    id
    createdBy {
      username
      email
      _createdAt
      _updatedAt
    }
    operation
    _createdAt
    channel { id }
  }
  }
`;


class Home extends Component {
    componentDidMount() {
        console.log('Home comp');

        //.then(response => console.log(response.data.allLinks)).catch(err => console.log(err))

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
                                            channel: input.value,
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
                        console.log(result.data);
                        return (<div></div>);
                    }}
                </Query>
                <Subscription
                    subscription={GQL_MSG_SUBSCRIPTION}
                    variables={{ channel: '12' }}
                >
                    {({ data, loading }) => (
                        <h4>New comment: {!loading && data && JSON.stringify(data)}</h4>
                    )}
                </Subscription>
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
