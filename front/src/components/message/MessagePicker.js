import React, {Component} from 'react';
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/es/Button/Button";
import {gql} from "apollo-boost";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles/index";
import Actions from "../../services/redux/actions";
import InputAdornment from "@material-ui/core/es/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Forward from "@material-ui/icons/es/Forward";
import Icon from "@material-ui/core/es/Icon/Icon";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import VisibilityOff from "@material-ui/icons/es/VisibilityOff";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import Input from "@material-ui/core/es/Input/Input";

class MessagePicker extends Component {
    state = {
        msgContent: null
    };

    static add() {
        return gql`
            mutation addMessage($content: String!, $channel: ID!) {
              addMessage(content: $content, channel: $channel) {
                content
                id
              }
            }`;
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.loadingEvent(true);
        this.props.mutation({
            variables: {
                channel: this.props.channel,
                content: this.state.msgContent
            }
        }).then(data => {
        }).catch(err => {
            this.props.triggerError(true, err.response.data.message);
        }).then(() => {
            this.props.loadingEvent(false);
        });
    };
    handleMouse = event => {
        event.preventDefault();
    };

    render() {
        return <div>
            <form className="formContainer" onSubmit={this.onSubmit}>
                <FormControl
                    fullWidth>
                    <Input
                        id="adornment-password"
                        value={this.state.msgContent}
                        onChange={this.handleChange('msgContent')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Send"
                                    type={'submit'}
                                >
                                    <Icon>send</Icon>
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </form>
        </div>
    }
}

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {
        triggerError: (bool, msg) => {
            dispatch(Actions.loginFailed(bool, msg));
        },
        loadingEvent: (bool) => {
            dispatch(Actions.loading(bool));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles({})(MessagePicker));
