import React, {Component} from 'react';
import {connect} from "react-redux";
import Actions from "../../services/redux/actions";
import './RoomList.css'
import Room from "./Room";

class RoomList extends Component {
    componentDidMount() {
        console.log('Mounting room :)');
        this.props.subscribeToNewComments();
    }

    render() {
        console.log(this.props);
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