import React from 'react';
import './CustomDrawer.css'
import {Drawer} from "@material-ui/core/index";
import {connect} from "react-redux";
import menuToggle from "../../../services/redux/actions/menuToggle";
import {withStyles} from '@material-ui/core/styles';
import {menuStyles} from "../index";

class CustomDrawer extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    toggleDrawer = () => {
        this.props.menuToggle(false);
    };

    render() {
        const {classes, variant} = this.props;
        return (
            <div>
                <Drawer classes={{paper: classes.drawerPaper}} variant={variant} open={this.props.menuOpen}
                        onClose={this.toggleDrawer}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer}
                        onKeyDown={this.toggleDrawer}
                    >
                        <div>
                            <div className={classes.toolbar}/>
                            {this.props.children}
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(menuStyles)(CustomDrawer));