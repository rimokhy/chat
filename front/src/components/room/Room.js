import React, {Component} from 'react';
import {connect} from "react-redux";
import Actions from "../../services/redux/actions";
import './Room.css'

class RoomList extends Component {
    componentDidMount() {
        console.log('Mounting room :)');
    }

    render() {
        return <div>
            <span>{this.props.msg.content}</span>
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
