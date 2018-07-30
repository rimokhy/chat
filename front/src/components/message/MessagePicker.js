import React, {Component} from 'react';
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/es/Button/Button";
import {gql} from "apollo-boost";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles/index";
import Actions from "../../services/redux/actions";

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
            this.props.loadingEvent(true);
        });
    };

    render() {
        return <div>
            <form className="formContainer" onSubmit={this.onSubmit}>
                <TextField onChange={this.handleChange('msgContent')}  label="Write message" />
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
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
