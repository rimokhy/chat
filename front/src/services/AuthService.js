import request from 'axios';

class AuthService {
    constructor() {
        this.logout();
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
        this.token = undefined;
        return request({
            method: 'post',
            url: '/logout',
        });
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem('token', JSON.stringify(this.token));
    }
}

export const Auth = new AuthService();