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
import {menuStyles} from './components/menu'
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router'

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.onMenuButton = this.onMenuButton.bind(this);
    }

    toggleMenu() {
        this.setState({
            visible: !this.state.visible
        })
    }

    onMenuButton(e) {
        this.toggleMenu();

        e.stopPropagation();
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

export default withRouter(withStyles(menuStyles)(App));