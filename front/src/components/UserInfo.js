import React, {Component} from "react";
import {Auth} from '../services/AuthService';
import {Avatar, ListItem} from "@material-ui/core/index";
import {AccountCircle} from "@material-ui/icons/index";
import {Link} from 'react-router-dom';
import {Divider} from "@material-ui/core/es/index";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import People from "@material-ui/icons/es/People";

import {withStyles} from '@material-ui/core/styles';
import {deepOrange, green} from "@material-ui/core/es/colors/index";
import SvgIcon from '@material-ui/core/SvgIcon';
import Add from "@material-ui/icons/es/Add";

const styles = {
    friends: {
        backgroundColor: deepOrange[800],
    },
    profile: {
        backgroundColor: green[500],
    },
};

let Logout = (props) => (
    <SvgIcon {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M192 277.4h189.7l-43.6 44.7L368 352l96-96-96-96-31 29.9 44.7 44.7H192v42.8z"/>
            <path
                d="M255.7 421.3c-44.1 0-85.5-17.2-116.7-48.4-31.2-31.2-48.3-72.7-48.3-116.9 0-44.1 17.2-85.7 48.3-116.9 31.2-31.2 72.6-48.4 116.7-48.4 44 0 85.3 17.1 116.5 48.2l30.3-30.3c-8.5-8.4-17.8-16.2-27.7-23.2C339.7 61 298.6 48 255.7 48 141.2 48 48 141.3 48 256s93.2 208 207.7 208c42.9 0 84-13 119-37.5 10-7 19.2-14.7 27.7-23.2l-30.2-30.2c-31.1 31.1-72.5 48.2-116.5 48.2zM448.004 256.847l-.849-.848.849-.849.848.849z"/>
        </svg>
    </SvgIcon>
);

class UserInfo extends Component {
    constructor(props, context) {
        super(props, context);

        this.goTo = this.goTo.bind(this);
    }

    goTo = () => {
        this.props.history.push('/profile')
    };

    render() {
        const user = Auth.token ? Auth.token.user : {};
        const {classes} = this.props;
        return <div>
            <Link to="/">
                <ListItem button>
                    {user.avatar && <Avatar src={user.avatar}/>}
                    {!user.avatar && <Avatar className={classes.profile}><AccountCircle/></Avatar>}
                </ListItem>
            </Link>
            <Divider/>
            <Link to="/room">
                <ListItem button>
                    <Avatar className={classes.friends}>
                        <Add/>
                    </Avatar>
                </ListItem>
            </Link>
            <Divider/>
            <Link to="/logout">
                <ListItem button>
                    <Avatar className={classes.friends}>
                        <Logout/>
                    </Avatar>
                </ListItem>
            </Link>
        </div>
    }
}

export default withStyles(styles)(UserInfo);