import React, {Component} from 'react';
import {connect} from "react-redux";
import Actions from "../services/redux/actions";
import gql from 'graphql-tag'
import {Auth} from '../services/AuthService'
import {Mutation, Query, Subscription} from "react-apollo";
/*
import './RoomWatcher.css'
import RoomList from './RoomList'
*/

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


class RoomWatcher extends Component {

    hasQuery(onFetch) {
        return onFetch && onFetch.component && onFetch.query;
    }

    render() {
        const {onAdd, onFetch} = this.props;
        const AddComponent = onAdd ? onAdd.component || null : null;
        const QueryComponent = onFetch ? onFetch.component || null : null;

        return (
            <div>
                {this.hasQuery(onAdd) &&
                <Mutation mutation={onAdd.query}>
                    {(mutator, response) => (
                        <div>
                            <AddComponent mutation={mutator}/>
                        </div>
                    )}
                </Mutation>
                }
                {this.hasQuery(onFetch) &&
                <Query query={GQL_ROOMS_QUERY} variables={{channel: '12'}}>
                    {({subscribeToMore, ...result}) => (
                        <div>
                            <QueryComponent {...result} subscriber={subscribeToMore}/>
                        </div>
                    )}
                </Query>
                }

            </div>
        );
    }
}

const
    mapStateToProps = state => {
        return {}
    };

const
    mapDispatchToProps = dispatch => {
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

export default connect(mapStateToProps, mapDispatchToProps)

(
    RoomWatcher
)
;
