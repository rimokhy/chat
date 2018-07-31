import React, {Component} from 'react';
import GQLWatcher from "../../components/GQLWatcher";
import ChannelList from "../../components/channel/ChannelList";
import {withRouter} from 'react-router'
import RoomList from "../../components/room/RoomList";
import {Link} from "react-router-dom";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import Add from "@material-ui/icons/es/Add";
import {withStyles} from "@material-ui/core/styles/index";
import {connect} from "react-redux";
import Actions from "../../services/redux/actions";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";

class Room extends Component {

    render() {
        const {classes} = this.props;
        const room = this.props.match.params.roomId;
        return (
            <div>
                {
                    room &&
                    <Link to={`/room/${room}/channel`}>
                        <ListItem button>
                            <Avatar>
                                <Add/>
                            </Avatar>
                            <ListItemText primary="Channels"/>
                        </ListItem>
                    </Link>
                }
                <GQLWatcher onFetch={room ? ChannelList : RoomList} fetchVars={{room}} showAction>
                </GQLWatcher>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles({})(Room)));
