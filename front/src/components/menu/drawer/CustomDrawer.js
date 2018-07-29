import React from 'react';
import './CustomDrawer.css'
import {ListItem, ListItemIcon, ListItemText, List, Drawer, Divider} from "@material-ui/core/index";
import {Auth} from '../../../services/AuthService'
import {Inbox, Star, Send, Drafts, Mail, Delete, Report} from "@material-ui/icons/index";
import {store, subscribeTo} from '../../../services/redux';
import Actions from "../../../services/redux/actions";
import {connect} from "react-redux";
import menuToggle from "../../../services/redux/actions/menuToggle";
import GQLWatcher from "../../GQLWatcher";
import RoomList from "../../room/RoomList";
import GQL from "../../room/GQL";
import RoomPicker from "../../room/RoomPicker";

class CustomDrawer extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    toggleDrawer = () => {
        this.props.menuToggle(false);
    };

    render() {

        const sideList = (
            <div>
                <GQLWatcher onFetch={{component: RoomList, query: GQL.messages}}>
                </GQLWatcher>
            </div>
        );
        return (
            <div>
                <Drawer open={this.props.menuOpen} onClose={this.toggleDrawer}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer}
                        onKeyDown={this.toggleDrawer}
                    >
                        {sideList}
                    </div>
                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {menuOpen: state.MENU_TOGGLE.menuOpen}
};

const mapDispatchToProps = dispatch => {
    return {
        menuToggle: (bool) => {
            dispatch(menuToggle(bool));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);