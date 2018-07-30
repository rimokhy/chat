import React, {Component} from 'react';
import GQLWatcher from "../../components/GQLWatcher";
import ChannelList from "../../components/channel/ChannelList";
import {withRouter} from 'react-router'

class Room extends Component {
    render() {
        const {classes} = this.props;
        console.log('room render');
        const room = this.props.match ? this.props.match.params.roomId || null : null;

        return (
            <div>
                <GQLWatcher onFetch={ChannelList} fetchVars={{room}}>
                </GQLWatcher>
            </div>
        );
    }
}

export default withRouter(Room);
