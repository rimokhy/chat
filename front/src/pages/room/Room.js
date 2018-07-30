import React, {Component} from 'react';
import GQLWatcher from "../../components/GQLWatcher";
import ChannelList from "../../components/channel/ChannelList";
import {withRouter} from 'react-router'
import RoomList from "../../components/room/RoomList";

class Room extends Component {
    render() {
        const {classes} = this.props;
        console.log('room render');
        const room = this.props.match.params.roomId ? this.props.match.params.roomId || undefined : undefined;
        console.log(room);
        return (
            <div>
                <GQLWatcher onFetch={room ? ChannelList : RoomList} fetchVars={{room}}>
                </GQLWatcher>
            </div>
        );
    }
}

export default withRouter(Room);
