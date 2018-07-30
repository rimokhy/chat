import React, {Component} from 'react';
import './css/Room.css'
import {deepPurple} from '@material-ui/core/colors';
import {Avatar, ListItem, ListItemText} from "@material-ui/core/index";
import {MeetingRoom} from '@material-ui/icons'
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import {IconButton, ListItemSecondaryAction} from "@material-ui/core/es/index";
import Favorite from "@material-ui/icons/es/Favorite";
import GQLWatcher from "../GQLWatcher";
import RoomJoin from "./RoomJoin";
import RoomLeave from "./RoomLeave";
import Icon from "@material-ui/core/es/Icon/Icon";

const styles = {
    avatar: {
        backgroundColor: deepPurple[400],
    },
};

class Room extends Component {
    render() {
        const {classes, showAction, room} = this.props;

        return <div>
            {
                !showAction &&
                <Link to={`/room/${room.id}`}>
                    <ListItem button>
                        <Avatar className={classes.avatar}>
                            {room.title.charAt(0)}
                        </Avatar>
                    </ListItem>
                </Link>
            }
            {
                showAction &&
                <ListItem>
                    <Avatar className={classes.avatar}>
                        <MeetingRoom/>
                    </Avatar>
                    <ListItemText primary={room.title}/>
                    <ListItemSecondaryAction>
                        {!room.isUserIn && <GQLWatcher onAdd={RoomJoin} addVars={{room}}/>}
                        {room.isUserIn && <GQLWatcher onAdd={RoomLeave} addVars={{room}}/>}
                    </ListItemSecondaryAction>
                </ListItem>
            }
        </div>
    }
}

export default withStyles(styles)(Room);
