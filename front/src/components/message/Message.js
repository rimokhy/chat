import React, {Component} from 'react';
import {ListItem, ListItemText} from "@material-ui/core/index";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import {Auth} from '../../services/AuthService'
import {AccountCircle} from "@material-ui/icons/es/index";

class Message extends Component {

    makeAvatar(message) {
        if (message.createdBy.avatar) {
            return <Avatar src={message.createdBy.avatar}/>
        }
        const {user} = Auth.token;

        if (user.id === message.id) {
            return <Avatar><AccountCircle/></Avatar>
        }
        return <Avatar>{message.createdBy.username.charAt(0)}</Avatar>
    }

    render() {
        const {message} = this.props;

        return <div>
            <ListItem>
                {this.makeAvatar(message)}
                <ListItemText primary={message.content} secondary={message._updatedAt ? message._updatedAt : message._createdAt}/>
            </ListItem>
        </div>
    }
}

export default Message;
