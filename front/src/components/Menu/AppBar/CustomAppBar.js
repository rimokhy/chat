import React from 'react';
import './CustomAppBar.css'
import {AppBar, Button, IconButton, Menu, MenuItem, Toolbar} from "@material-ui/core/index";
import {AccountCircle} from "@material-ui/icons/index";
import {Auth} from '../../../services/AuthService';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Actions from '../../../services/redux/actions';
import {connect} from "react-redux";

class CustomAppBar extends React.Component {
    state = {
        anchorEl: null
    };

    constructor(props, context) {
        super(props, context);

    }

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    handleClick = () => {
        this.props.menuToggle(true);
        this.setState({anchorEl: null});
    };

    render() {
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);
        return (
            <div>
                <AppBar position="absolute" className="root">
                    <Toolbar>

                        <IconButton color="inherit" aria-label="Menu" onClick={this.handleClick}>
                            <MenuIcon/>
                        </IconButton>

                        <Typography variant="title" color="inherit" className="flex">
                            Photos
                        </Typography>
                        {Auth.isAuth() && (
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                </Menu>
                            </div>
                        )}
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
            </div>
        );
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(CustomAppBar);