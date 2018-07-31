import React, {Component} from 'react';
import {connect} from "react-redux";
import qs from "query-string";
import Actions from "../../services/redux/actions";
import {Auth} from "../../services/AuthService";
import './Login.css'

import {withRouter} from 'react-router'

class Logout extends Component {
    state = {loading: false, loginError: undefined};

    componentDidMount() {
        this.props.loadingEvent(true);
        Auth.logout().then(res => {
        }).catch(err => {
        }).then(() => {
            this.props.history.push('/login');
            Auth.setToken(undefined);
            this.props.loadingEvent(false);
        });
    }

    render() {
        return (<div/>)
    }
}

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {
        loadingEvent: (bool) => {
            dispatch(Actions.loading(bool));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Logout));
