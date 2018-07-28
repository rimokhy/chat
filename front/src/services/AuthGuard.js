import {Redirect, Route} from "react-router-dom";
import React, {Component} from 'react';
import {Auth} from "./AuthService";

export const AuthGuard = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        Auth.isAuth() ?
            <Component {...props} /> :
            <Redirect to='/login' />
    )} />
);