import React, {Component} from 'react';
import {deepPurple} from '@material-ui/core/colors';
import {Avatar, ListItem, ListItemText} from "@material-ui/core/index";
import {List as ListIcon} from '@material-ui/icons'
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';

const styles = {
    avatar: {
        backgroundColor: deepPurple[400],
    },
};

class ChannelList extends Component {
    render() {
        const {classes, room} = this.props;

        return <div>
            <Link to={`/${room ? `room/${room}/channel` : 'channel' }/${this.props.channel.id}`}>
                <ListItem button>
                    <Avatar className={classes.avatar}>
                        <ListIcon/>
                    </Avatar>
                    <ListItemText primary={this.props.channel.title}/>
                </ListItem>
            </Link>
        </div>
    }
}

export default withStyles(styles)(ChannelList);
