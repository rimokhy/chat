import React, {Component} from 'react';
import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import CustomAppBar from './components/menu/appBar/CustomAppBar';
import CustomDrawer from "./components/menu/drawer/CustomDrawer";
import ErrorSnackbar from "./components/ErrorSnackbar";
import Loading from "./components/Loading";
import {Divider} from "@material-ui/core/index";
import GQLWatcher from "./components/GQLWatcher";
import RoomList from "./components/room/RoomList";
import UserInfo from "./components/UserInfo";
import List from "@material-ui/core/es/List/List";
import {withRouter} from 'react-router'
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import Add from "@material-ui/icons/es/Add";
import {withStyles} from "@material-ui/core/styles/index";
import Avatar from "@material-ui/core/es/Avatar/Avatar";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit * 2,
    },
});

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState({
            visible: !this.state.visible
        })
    }

    onRoomClick = (e) => {
        console.log('Clicked');
        this.props.history.push('/room')
    }

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <CssBaseline/>
                <CustomAppBar>
                </CustomAppBar>
                <CustomDrawer>
                    <List>
                        <UserInfo/>
                        <Divider/>
                        <GQLWatcher onFetch={RoomList}>
                        </GQLWatcher>
                    </List>
                </CustomDrawer>

                <ErrorSnackbar/>
                <Loading/>
            </React.Fragment>

        );
    }
}

export default withRouter(withStyles(styles)(App));