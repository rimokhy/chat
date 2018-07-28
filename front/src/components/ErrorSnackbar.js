import {Snackbar, IconButton} from "@material-ui/core/index";
import {Close} from '@material-ui/icons';
import React, {Component} from "react";
import Actions from '../services/redux/actions';
import {connect} from "react-redux";

class ErrorSnackbar extends Component {
    handleClose = () => {
        this.props.loginFailed(false);
    };

    render() {
        return <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.props.showError}
                autoHideDuration={6000}
                onClose={this.handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.props.errorMsg}</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={this.handleClose}
                    >
                        <Close/>
                    </IconButton>,
                ]}
            />
        </div>
    }
}

const mapStateToProps = state => {
    return {showError: state.LOGIN_FAILED.showError, errorMsg: state.LOGIN_FAILED.errorMsg}
};

const mapDispatchToProps = dispatch => {
    return {
        loginFailed: (bool, msg) => {
            dispatch(Actions.loginFailed(bool, msg));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorSnackbar);