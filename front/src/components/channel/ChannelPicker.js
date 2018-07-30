import React, {Component} from 'react';
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/es/Button/Button";
import {gql} from "apollo-boost";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles/index";
import Actions from "../../services/redux/actions";
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";
import FormGroup from "@material-ui/core/es/FormGroup/FormGroup";
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import {Typography} from "@material-ui/core/es/index";
import {withRouter} from 'react-router'

const styles = theme => ({
    item: {
        margin: theme.spacing.unit
    }
});

class RoomPicker extends Component {
    state = {
        roomTitle: null
    };

    static add() {
        return gql`
            mutation addChannel($title: String!, $room: ID!) {
              addChannel(title: $title, room: $room) {
                title
                id
                _createdAt
                _updatedAt
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
        console.log('Submit picker channel (match) : ' + this.props.match.roomId);
        console.log('Submit picker channel (props) : ' + this.props.room);
        this.props.loadingEvent(true);
        this.props.mutation({
            variables: {
                title: this.state.roomTitle,
                room: this.props.match.roomId
            }
        }).then(data => {
            this.props.triggerError(true, 'Successfully added channel');
        }).catch(err => {
            this.props.triggerError(true, err.graphQLErrors[0].message);
        }).then(() => {
            this.props.loadingEvent(false);
        });
    };

    render() {
        const { classes } = this.props;
        console.log('Render picker channel (match) : ' + this.props.match.roomId);
        console.log('Render picker channel (props) : ' + this.props.room);
        return <div>
            <form onSubmit={this.onSubmit}>
                <FormGroup row>
                    <TextField className={classes.item} onChange={this.handleChange('roomTitle')} label="Room title"/>
                </FormGroup>
                <Button variant="contained" color="primary" type="submit" className={classes.item}>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(RoomPicker)));
