import React, {Component} from 'react';
import {gql} from "apollo-boost";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles/index";
import Actions from "../../services/redux/actions";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import FavoriteBorder from "@material-ui/icons/es/FavoriteBorder";
import NoMeetingRoom from "@material-ui/icons/es/NoMeetingRoom";

const styles = theme => ({
    item: {
        margin: theme.spacing.unit
    }
});

class RoomLeave extends Component {
    state = {};

    static add() {
        return gql`
            mutation leaveChannel($channel: ID!) {
             leaveChannel(channel: $channel) {
                title
                id
                _createdAt
                _updatedAt
                isUserIn
                operation
              }
            }`;
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.loadingEvent(true);
        this.props.mutation({
            variables: {
                channel: this.props.channel
            }
        }).then(data => {
            this.props.triggerError(true, 'Successfully left room');
        }).catch(err => {
            this.props.triggerError(true, err.graphQLErrors[0].message);
        }).then(() => {
            this.props.loadingEvent(false);
        });
    };

    render() {
        return <div>
            <IconButton aria-label="Leave" onClick={this.onSubmit}>
                <NoMeetingRoom/>
            </IconButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RoomLeave));
