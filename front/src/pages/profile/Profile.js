import React, {Component} from 'react';
import {withRouter} from 'react-router'
import FriendList from "../../components/channel/FriendList";
import GQLWatcher from "../../components/GQLWatcher";
import Paper from "@material-ui/core/es/Paper/Paper";
import Typography from "@material-ui/core/es/Typography/Typography";


class Profile extends Component {
    render() {
        return (<div>
                <Typography variant={"headline"}>Friends will appear here !</Typography>
                {/*  <GQLWatcher onFetch={FriendList}>
                </GQLWatcher>*/}
            </div>
        );
    }
}

export default withRouter(Profile);
