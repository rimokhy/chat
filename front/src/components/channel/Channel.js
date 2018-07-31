import React, {Component} from 'react';
import {deepPurple} from '@material-ui/core/colors';
import {Avatar, ListItem, ListItemText} from "@material-ui/core/index";
import {List as ListIcon} from '@material-ui/icons'
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import ChannelJoin from "./ChannelJoin";
import GQLWatcher from "../GQLWatcher";
import {ListItemSecondaryAction} from "@material-ui/core/es/index";
import ChannelLeave from "./ChannelLeave";
import {connect} from "react-redux";
import Actions from "../../services/redux/actions";

const styles = {
    avatar: {
        backgroundColor: deepPurple[400],
    },
};

class Channel extends Component {
    render() {
        const {classes, room, showAction} = this.props;
        console.log('Chann');
        return <div>
            {!showAction && <Link to={`/${room ? `room/${room}/channel` : 'channel' }/${this.props.channel.id}`}>
                <ListItem button>
                    <Avatar className={classes.avatar}>
                        <ListIcon/>
                    </Avatar>
                    <ListItemText primary={this.props.channel.title}/>
                </ListItem>
            </Link>}
            {showAction &&
            <ListItem>
                <Avatar className={classes.avatar}>
                    <ListIcon/>
                </Avatar>
                <ListItemText primary={this.props.channel.title}/>
                <ListItemSecondaryAction>

                    {this.props.channel.isUserIn && <GQLWatcher onAdd={ChannelLeave} addVars={{channel: this.props.channel.id}}/>}

                    {!this.props.channel.isUserIn && <GQLWatcher onAdd={ChannelJoin} addVars={{channel: this.props.channel.id}}/>}
                </ListItemSecondaryAction>
            </ListItem>
            }

        </div>
    }
}

export default withStyles(styles)(Channel);