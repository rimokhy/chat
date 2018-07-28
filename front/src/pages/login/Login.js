import React, {Component} from 'react';
import google from '../../assets/google.png'
import github from '../../assets/github.png'
import {Auth} from "../../services/AuthService";
import './Login.css'
import {
    Button,
    ButtonBase,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    TextField
} from "@material-ui/core/index";
import {connect} from "react-redux";
import Actions from "../../services/redux/actions";

const externalAuthentication = [{
    name: 'Github',
    icon: github,
    onClick: function () {
        Auth.login('caca', 'cucu')

    }
}, {
    name: 'Google',
    icon: google,
    onClick: function () {
        console.log('Go to /auth/google');
    }

}];

class Login extends Component {
    state = {loading: false, loginError: undefined};

    constructor(props, context) {
        super(props, context);

        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    login(event) {
        this.props.loadingEvent(true);

        Auth.login(this.state.username, this.state.password).then(res => {
            Auth.setToken(res.data);
            this.props.history.push('/');
        }).catch(err => {
            this.props.loginFailed(true, err.response.data.message);
        }).then(() => {
//            this.props.loadingEvent(false);
        });
        event.preventDefault();
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        return (
            <div>
                <Card>
                    <CardContent>
                        <form className="formContainer" onSubmit={this.login}>
                            <TextField onChange={this.handleChange('username')} id="username" label="Username"
                                       margin="normal"/>
                            <TextField onChange={this.handleChange('password')} id="password" label="Password"
                                       type="password" margin="normal"/>
                            <Button variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                        </form>
                    </CardContent>
                    <CardActions>
                        {externalAuthentication.map(auth => (
                            <ButtonBase focusRipple key={auth.name} onClick={auth.onClick}>
                                <img src={auth.icon}/>
                            </ButtonBase>
                        ))}
                    </CardActions>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {
        loginFailed: (bool, msg) => {
            dispatch(Actions.loginFailed(bool, msg));
        },
        loadingEvent: (bool) => {
            console.log('dispatch login');
            dispatch(Actions.loading(bool));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
