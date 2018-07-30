import React, {Component} from 'react';
import {ListItem, ListItemText} from "@material-ui/core/index";
import Typography from "@material-ui/core/Typography";

class Message extends Component {
    render() {
        console.log(this.props);
        return <div>
            <ListItem>
                <Typography variant={"headline"}>
                    {this.props.message.content}
                </Typography>
                <Typography variant={"subheading"}>
                    {this.props.message._createdAt}
                </Typography>
                <Typography variant={"subheading"}>
                    {this.props.message._updatedAt}
                </Typography>
            </ListItem>
        </div>
    }
}

export default Message;
