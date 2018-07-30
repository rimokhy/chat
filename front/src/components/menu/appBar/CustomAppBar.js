import React from 'react';
import './CustomAppBar.css'
import {AppBar, Button, IconButton, Toolbar} from "@material-ui/core/index";
import {Auth} from '../../../services/AuthService';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Actions from '../../../services/redux/actions';
import {connect} from "react-redux";
import {withStyles} from '@material-ui/core/styles';
import {menuStyles} from "../index";
import Drawer from "@material-ui/core/es/Drawer/Drawer";
import Room from "../../../pages/room/Room";
import Channel from "../../../pages/channel/Channel";
import {AuthGuard} from "../../../services/AuthGuard";
import {withRouter} from 'react-router'
import Login from "../../../pages/login/Login";
import Profile from "../../../pages/profile/Profile";
import {Route, Switch} from 'react-router-dom';
import Logout from "../../../pages/login/Logout";
import RoomAction from "../../../pages/room/RoomAction";
import ChannelAction from "../../../pages/channel/ChannelAction";

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {
        menuToggle: (bool) => {
            dispatch(Actions.menuToggle(bool));
        }
    };
};


class ClippedDrawer extends React.Component {
    state = {};

    handleClick = () => {
        this.props.menuToggle(true);
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>

                <AppBar position="absolute" className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Menu" onClick={this.handleClick}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="title" color="inherit" noWrap>
                            Clipped drawer
                        </Typography>
                        {!(Auth.isAuth()) && <div>
                            <Button variant="contained" color="secondary">
                                Sign-In
                            </Button>
                            <Button variant="contained" color="secondary">
                                Login
                            </Button>
                        </div>}
                    </Toolbar>
                </AppBar>
                {Auth.isAuth() &&
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}>
                    <div className={classes.toolbar}/>
                    <Switch>
                        <AuthGuard path="/room/:roomId?" component={Room}/>
                        <AuthGuard exact path="/" component={Profile}/>
                    </Switch>
                </Drawer>
                }
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <AuthGuard path="/room/:roomId/channel/:channelId?" component={Channel}/>
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <AuthGuard exact path="/logout" component={Logout}/>
                        <AuthGuard exact path="/room/:roomId?" component={RoomAction}/>
                        <AuthGuard path="/room/:roomId/channel/:channelId?" component={ChannelAction}/>
                    </Switch>
                </main>
            </div>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(menuStyles)(ClippedDrawer)));
