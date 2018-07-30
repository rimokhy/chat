import React, {Component} from 'react';
import './css/Room.css'
import {deepPurple} from '@material-ui/core/colors';
import {Avatar, ListItem, ListItemText} from "@material-ui/core/index";
import {MeetingRoom} from '@material-ui/icons'
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';

const styles = {
    avatar: {
        backgroundColor: deepPurple[400],
    },
};

class RoomList extends Component {
    render() {
        const {classes} = this.props;
        return <div>
            <Link to={`/room/${this.props.room.id}`}>
                <ListItem button>
                    <Avatar className={classes.avatar}>
                        <MeetingRoom/>
                    </Avatar>
                    <ListItemText primary={this.props.room.title} secondary={this.props.room._createdAt}/>
                </ListItem>
            </Link>
        </div>
    }
}

export default withStyles(styles)(RoomList);
