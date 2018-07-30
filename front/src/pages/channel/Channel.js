import React, {Component} from 'react';
import GQLWatcher from "../../components/GQLWatcher";
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router'
import MessageList from "../../components/message/MessageList";
import MessagePicker from "../../components/message/MessagePicker";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    withoutLabel: {
        margin: theme.spacing.unit * 3,
    },
    textField: {
        flexBasis: 200,
    },
});

class Channel extends Component {
    render() {
        const room = this.props.match ? this.props.match.params.roomId || null : null;
        const channel = this.props.match ? this.props.match.params.channelId || null : null;
        const {classes} = this.props;

        if (!channel) {
            return <div/>
        }
        return (
            <div className={classes.root}>
                <div>
                    <GQLWatcher onFetch={MessageList} fetchVars={{channel}}/>
                </div>
                <div>
                    <GQLWatcher onAdd={MessagePicker} addVars={{channel}}/>
                </div>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(Channel));
