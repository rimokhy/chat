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
        displayAddRoom: false,
        displayPublic: true
    };

    toggle = () => {
        this.setState({displayAddRoom: !this.state.displayAddRoom, displayPublic: !this.state.displayPublic});
    };

    render() {
        const {classes} = this.props;

        return (<div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={3}>
                        <Button size="large" color="secondary" aria-label="Add" className={classes.button} onClick={this.toggle}>
                            Create a room
                            <Add/>
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button size="large" color="secondary" aria-label="Add" className={classes.button} onClick={this.toggle}>
                            Display public rooms
                            <Add/>
                        </Button>
                    </Grid>
                </Grid>

                {
                    this.state.displayAddRoom &&
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Typography variant="headline">Add room</Typography>
                            <GQLWatcher onAdd={RoomPicker}/>
                        </Grid>
                    </Grid>
                }

                {
                    this.state.displayPublic &&
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Typography variant="headline">Public Rooms</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <GQLWatcher onFetch={PublicRoomList}/>
                        </Grid>
                    </Grid>
                }

            </div>
        );
    }
}

export default withRouter(withStyles(styles)(RoomAction));
