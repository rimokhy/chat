import React, {Component} from 'react';
import {connect} from "react-redux";
import Actions from "../services/redux/actions";
import {Mutation, Query} from "react-apollo";


class GQLWatcher extends Component {

    hasQuery(onFetch) {
        return onFetch;
    }

    render() {
        const {onAdd, onFetch, fetchVars, addVars} = this.props;
        const AddComponent = onAdd;
        const QueryComponent = onFetch;
        console.log(addVars);
        return (
            <div>
                {this.hasQuery(onAdd) &&
                <Mutation mutation={onAdd.add()} variables={addVars || {}}>
                    {(mutator, response) => (
                        <div>
                            <AddComponent {...addVars} mutation={mutator}/>
                        </div>
                    )}
                </Mutation>
                }
                {this.hasQuery(onFetch) &&
                <Query query={onFetch.query()} variables={fetchVars || {}}>
                    {({error, loading, subscribeToMore, ...result}) => (
                        <div>
                            {error && this.props.triggerError(true, error)}
                            {loading && this.props.loadingEvent(true)}
                            {!loading && this.props.loadingEvent(false)}
                            <QueryComponent {...result} subscriber={subscribeToMore} fetchVars={fetchVars || {}}/>
                        </div>
                    )}
                </Query>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {
        loadingEvent: (bool) => {
            dispatch(Actions.loading(bool));
            return null;
        },
        triggerError: (bool, {networkError, graphQLErrors}) => {
            let msg = '';

            if (networkError) {
                if (networkError.statusCode === 401) {
                    dispatch(Actions.navigation('/login'));
                    return null;
                }
                msg = networkError.message;
            }
            dispatch(Actions.loginFailed(bool, msg.message));
            return null;
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GQLWatcher);
