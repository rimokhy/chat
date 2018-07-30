import React, {Component} from 'react';
import GQLWatcher from "../../components/GQLWatcher";
import ChannelList from "../../components/channel/ChannelList";
import {withRouter} from 'react-router'
import RoomList from "../../components/room/RoomList";
import {Link} from "react-router-dom";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import Add from "@material-ui/icons/es/Add";

class Room extends Component {
    render() {
        const {classes} = this.props;
        console.log('room render');
        const room = this.props.match.params.roomId;
        console.log(room);
        return (
            <div>
                {
                    room &&
                    <Link to={`/room/${room}/channel`}>
                        <ListItem button>
                            <Avatar>
                                <Add/>
                            </Avatar>
                        </ListItem>
                    </Link>
                }
                <GQLWatcher onFetch={room ? ChannelList : RoomList} fetchVars={{room}}>
                </GQLWatcher>
            </div>
        );
    }
}

export default withRouter(Room);
