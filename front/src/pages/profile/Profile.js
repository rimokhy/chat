import React, {Component} from 'react';
import {withRouter} from 'react-router'
import FriendList from "../../components/channel/FriendList";
import GQLWatcher from "../../components/GQLWatcher";


class Profile extends Component {
    render() {
        console.log('Mounting profile (friend list)');
        return (<div>
                Iam FriendList :)
              {/*  <GQLWatcher onFetch={FriendList}>
                </GQLWatcher>*/}
            </div>
        );
    }
}

export default withRouter(Profile);
