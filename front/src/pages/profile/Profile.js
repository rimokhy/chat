import React, {Component} from 'react';
import {withRouter} from 'react-router'


class Profile extends Component {
    render() {
        const room = this.props.match ? this.props.match.params.roomId || null : null;
        const {classes} = this.props;
        console.log(room);
        return (<div>jui cloepotre


{/*
                <CustomDrawer variant="permanent">
                    <GQLWatcher onFetch={ChannelList} onFetchVars={room}>
                    </GQLWatcher>
                </CustomDrawer>
*/}


            </div>
        );
    }
}

export default withRouter(Profile);
