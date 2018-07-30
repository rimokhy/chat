import React, {Component} from 'react';
import {Button, ButtonBase, Card, CardActions, CardContent, TextField} from "@material-ui/core/index";
import {connect} from "react-redux";
import qs from "query-string";
import Actions from "../../services/redux/actions";
import google from '../../assets/google.png'
import github from '../../assets/github.png'
import {Auth} from "../../services/AuthService";
import {withRouter} from 'react-router'
import './Login.css'
import {withStyles} from '@material-ui/core/styles';
const externalAuthentication = [{
    name: 'github',
    icon: github
}, {
    name: 'google',
    icon: google

}];

class Login extends Component {
    state = {loading: false, loginError: undefined};

    constructor(props, context) {
        super(props, context);

        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const urlParam = qs.parse(this.props.location.search);

        if (urlParam && urlParam.provider) {
            this.props.loadingEvent(true);
            Auth.externalAuth(urlParam.provider, this.props.location.search)
                .then(res => {
                    Auth.setToken(res.data);
                    this.props.history.push('/');
                })
                .catch(err => {
                    this.props.triggerError(true, err.response.data.message);
                }).then(() => {
                this.props.loadingEvent(false);
            });
        }
    }

    login(event) {
        this.props.loadingEvent(true);

        Auth.login(this.state.username, this.state.password).then(res => {
            Auth.setToken(res.data);
            this.props.history.push('/');
        }).catch(err => {
            this.props.triggerError(true, err.response.data.message);
        }).then(() => {
            this.props.loadingEvent(false);
        });
        event.preventDefault();
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    onExternalAuthClick = name => {
        return () => {
            this.props.loadingEvent(true);
            Auth.externalAuthRedirect(name).then(res => {
                this.props.navigate(res.data.uri);
            }).catch(err => {
                this.props.triggerError(true, err.response.data.message);
            }).then(() => {
                this.props.loadingEvent(true);
            });
        }
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
                            <ButtonBase focusRipple key={auth.name} onClick={this.onExternalAuthClick(auth.name)}>
                                <img src={auth.icon} alt={auth.name}/>
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
        triggerError: (bool, msg) => {
            dispatch(Actions.loginFailed(bool, msg));
        },
        navigate: (uri, obj) => {
            dispatch(Actions.navigation(uri, obj));
        },
        loadingEvent: (bool) => {
            dispatch(Actions.loading(bool));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles({})(Login)));
