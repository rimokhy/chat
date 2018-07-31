import React, {Component} from 'react';
import {withRouter} from 'react-router'
import {withStyles} from '@material-ui/core/styles';
import GQLWatcher from "../../components/GQLWatcher";
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/es/Button/Button";
import Add from "@material-ui/icons/es/Add";
import Typography from "@material-ui/core/es/Typography/Typography";
import PublicRoomList from "../../components/room/PublicRoomList";
import RoomPicker from "../../components/room/RoomPicker";
import AppBar from "@material-ui/core/es/AppBar/AppBar";
import Tabs from "@material-ui/core/es/Tabs/Tabs";
import Tab from "@material-ui/core/es/Tab/Tab";
import ChannelPicker from "../../components/channel/ChannelPicker";
import {connect} from "react-redux";
import Actions from "../../services/redux/actions";

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


class RoomAction extends Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {classes} = this.props;
        const {value} = this.state;

        return (<div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label="Add Room"/>
                        <Tab label="Public Rooms"/>
                    </Tabs>
                </AppBar>

                {
                    this.state.value === 0 &&
                    <Grid container spacing={24}>
                        <GQLWatcher onAdd={RoomPicker}/>
                    </Grid>
                }

                {
                    this.state.value === 1 &&
                    <Grid container spacing={24}>
                        <GQLWatcher onFetch={PublicRoomList}/>
                    </Grid>
                }
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(RoomAction));
