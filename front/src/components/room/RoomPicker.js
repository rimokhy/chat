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

const styles = theme => ({
    item: {
        margin: theme.spacing.unit
    }
});

class RoomPicker extends Component {
    state = {
        roomTitle: null,
        isPublic: false
    };

    static add() {
        return gql`
            mutation addRoom($title: String!, $private: Boolean!) {
              addRoom(title: $title, private: $private) {
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

    handleCheckboxChange = name => event => {
        this.setState({[name]: event.target.checked});
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.loadingEvent(true);
        this.props.mutation({
            variables: {
                title: this.state.roomTitle,
                private: !(this.state.isPublic)
            }
        }).then(data => {
            this.props.triggerError(true, 'Successfully added room');
        }).catch(err => {
            this.props.triggerError(true, err.graphQLErrors[0].message);
        }).then(() => {
            this.props.loadingEvent(false);
        });
    };

    render() {
        const { classes } = this.props;

        return <div>
            <form onSubmit={this.onSubmit}>
                <FormGroup row>
                    <TextField className={classes.item} onChange={this.handleChange('roomTitle')} label="Room title"/>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.isPublic}
                                onChange={this.handleCheckboxChange('isPublic')}
                                value="Room public"
                            />
                        }
                        label="Public"
                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RoomPicker));
