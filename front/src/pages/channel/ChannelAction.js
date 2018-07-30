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
        value: 'addRoom',
    };

    onAddRoom = () => {
        this.setState({value: 'addRoom'})
    };
    onPublicRooms = () => {
        this.setState({value: 'publicRooms'})
    };

    onAddChannel = () => {
        this.setState({value: 'addChannel'})
    };

    render() {
        const {classes} = this.props;
        console.log('Render RoomAction channel (match) : ' + this.props.match.roomId);
        console.log('Render roomAction channel (props) : ' + this.props.room);

        return (<div className={classes.root}>
                <AppBar position="static">
                    <Grid container spacing={24}>
                        <Grid item xs={3}>
                            <Button color="secondary" aria-label="Add" className={classes.button}
                                    onClick={this.onAddRoom}>
                                Room <Add/>
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button color="secondary" aria-label="Public rooms" className={classes.button}
                                    onClick={this.onPublicRooms}>
                                Public Rooms
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button color="secondary" aria-label="Public rooms" className={classes.button}
                                    onClick={this.onAddChannel}>
                                Channel <Add/>
                            </Button>
                        </Grid>
                    </Grid>
                </AppBar>

                {
                    this.state.value === 'addRoom' &&
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Typography variant="headline">Add room</Typography>
                            <GQLWatcher onAdd={RoomPicker}/>
                        </Grid>
                    </Grid>
                }

                {
                    this.state.value === 'publicRooms' &&
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Typography variant="headline">Public Rooms</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <GQLWatcher onFetch={PublicRoomList}/>
                        </Grid>
                    </Grid>
                }

                {
                    this.state.value === 'addChannel' &&
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Typography variant="headline">Add channel</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <GQLWatcher onAdd={ChannelPicker}/>
                        </Grid>
                    </Grid>
                }

            </div>
        );
    }
}

export default withRouter(withStyles(styles)(RoomAction));
