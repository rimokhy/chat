import {Token, User} from '../../models/index';

export const parseToken = async (authHeader) => {
    if (authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7, authHeader.length);
        return Promise.resolve(token);
    }
    return Promise.reject(new Error('Failed to decode token'));
};


export const httpError = (res, msg, code) => {
    res.statusCode = code;
    res.send(JSON.stringify({message: msg}));
};

export const getTokenError = (token) => {
    if (token === null) {
        throw new Error('No match found for specified token');
    } else if (Date.now() > token.expires.getTime()) {
        throw new Error('Token expired');
    }
};

export const validateToken = async payload => Token.findOne(payload).then(async (data) => {
    getTokenError(data);
    const user = await User.findById(data.user);

    if ('password' in user) {
        delete user['password'];
    }
    return Promise.resolve(user);
});

export default (app) => {
    app.use((req, res, next) => {
        parseToken(req.headers.authorization || '').then((token) => {
            validateToken({accessToken: token})
                .then((user) => {
                    req.context = {
                        user,
                    };
                    next();
                })
                .catch(err => httpError(res, `Unauthorized: ${err.toString()}`, 401));
        }).catch((err) => httpError(res, `Unauthorized: ${err.toString()}`, 401));
    });
};
