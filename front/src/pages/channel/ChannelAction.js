import React, {Component} from 'react';
import {withRouter} from 'react-router'
import {withStyles} from '@material-ui/core/styles';
import GQLWatcher from "../../components/GQLWatcher";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/es/Typography/Typography";
import ChannelPicker from "../../components/channel/ChannelPicker";
import AppBar from "@material-ui/core/es/AppBar/AppBar";
import Tabs from "@material-ui/core/es/Tabs/Tabs";
import Tab from "@material-ui/core/es/Tab/Tab";
import ChannelList from "../../components/channel/ChannelList";
import {connect} from "react-redux";
import Actions from "../../services/redux/actions";
import RoomChannelList from "../../components/channel/RoomChannelList";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});


class ChannelAction extends Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {classes} = this.props;
        const {value} = this.state;
        const room = this.props.match.params.roomId;
        console.log('Channel action');
        return (<div className={classes.root}>
                <AppBar position="sticky">
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label="Add Channel"/>
                        <Tab label="Room Channels"/>
                    </Tabs>
                </AppBar>

                {
                    this.state.value === 0 &&
                    <Grid container spacing={24}>
                        <GQLWatcher onAdd={ChannelPicker}/>
                    </Grid>
                }

                {
                    this.state.value === 1 &&
                    <GQLWatcher onFetch={RoomChannelList} fetchVars={{room}} />

                }
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {room: state.ON_NAV.room, channel: state.ON_NAV.channel}
};

const mapDispatchToProps = dispatch => {
    return {
        onRoom: (room, channel) => {
            dispatch(Actions.onRoom(room, channel));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles({})(ChannelAction)));
