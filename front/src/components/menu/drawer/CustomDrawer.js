import React from 'react';
import './CustomDrawer.css'
import {Drawer} from "@material-ui/core/index";
import {connect} from "react-redux";
import menuToggle from "../../../services/redux/actions/menuToggle";

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
                <Drawer  variant={variant} open={this.props.menuOpen}
                        onClose={this.toggleDrawer}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer}
                        onKeyDown={this.toggleDrawer}
                    >
                        <div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);