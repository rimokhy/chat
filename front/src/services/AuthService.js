import request from 'axios';
import {ApolloClient} from 'apollo-client'
import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import gql from 'graphql-tag'

class AuthService {

    constructor() {
        try {
            this.token = JSON.parse(localStorage.getItem('token'));
        } catch (e) {
            this.setToken(undefined);
        }
    }

    login(username, password) {
        return request({
            method: 'post',
            url: '/login',
            auth: {
                username,
                password
            }
        })
    }

    isAuth() {
        return this.token;
    }

    logout() {
        this.setToken(undefined);
        return request({
            method: 'post',
            url: '/logout',
        });
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem('token', JSON.stringify(this.token));
    }

    externalAuthRedirect(name) {
        return request({
            method: 'get',
            url: `/auth/${name}`,
        });
    }

    externalAuth(name, urlParam) {
        return request({
            method: 'get',
            url: `/auth/${name}/callback${urlParam}`,
        });
    }
}

export const Auth = new AuthService();