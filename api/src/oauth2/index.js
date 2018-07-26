import {Token, User} from '../models';

const parseToken = (headers) => {
    const authHeader = headers.authorization;

    if ((authHeader || '').startsWith('Bearer ')) {
        const token = authHeader.substring(7, authHeader.length);
        return new Promise(resolve => resolve(token));
    }
    return Promise.reject(new Error('Failed to decode token'));
};

const unauthorized = (res, msg) => {
    res.statusCode = 401;
    res.send(JSON.stringify({message: msg}));
};

const validateToken = token => Token.findOne({accessToken: token}).then(async (data) => {
    if (data === null) {
        throw new Error('No match found for specified token');
    } else if (Date.now() > data.expires.getTime()) {
        throw new Error('Token expired');
    }
    return User.findById(data.user);
});

export default (app) => {
    app.use((req, res, next) => {
        parseToken(req.headers).then((token) => {
            validateToken(token)
                .then((user) => {
                    req.context = {
                        user,
                    };
                    next();
                })
                .catch(err => unauthorized(res, `Unauthorized: ${err.toString()}`));
        }).catch((err) => {
            unauthorized(res, `Unauthorized: ${err.toString()}`);
        });
    });
};
