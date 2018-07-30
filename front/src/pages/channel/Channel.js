import React, {Component} from 'react';
import GQLWatcher from "../../components/GQLWatcher";
import {withRouter} from 'react-router'
import MessageList from "../../components/message/MessageList";

class Channel extends Component {
    render() {
        console.log('Channel render');
        const room = this.props.match ? this.props.match.params.roomId || null : null;
        const channel = this.props.match ? this.props.match.params.channelId || null : null;
        if (!channel) {
            console.log('No chan dude');
            return <div/>
        }
        return (
            <div>
                <GQLWatcher onFetch={MessageList} fetchVars={{channel}}/>
                <div>Je suis le channel du Q {channel} de la room {room} :)</div>
            </div>
        );
    }
}

export default withRouter(Channel);
