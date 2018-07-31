import React, {Component} from 'react';
import GQLWatcher from "../../components/GQLWatcher";
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router'
import MessageList from "../../components/message/MessageList";
import MessagePicker from "../../components/message/MessagePicker";
import Grid from "@material-ui/core/es/Grid/Grid";
import Paper from "@material-ui/core/es/Paper/Paper";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import * as ReactDOM from "react-dom";
import Divider from "@material-ui/core/es/Divider/Divider";

const styles = theme => ({
    root: {
        flexGrow: 1
    }
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
            <div>
                <Card square>
                    <CardContent>
                        <GQLWatcher onFetch={MessageList} fetchVars={{channel}}/>
                    </CardContent>
                </Card>
                <Divider/>
                <Card square>
                    <CardContent>
                        <GQLWatcher onAdd={MessagePicker} addVars={{channel}}/>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(Channel));
