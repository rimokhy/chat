import {Token, User} from '../../models/index';

const parseToken = async (headers) => {
    const authHeader = headers.authorization || '';

    if (authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7, authHeader.length);

        return new Promise(resolve => resolve(token));
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
    return User.findById(data.user);
});

export default (app) => {
    app.use(async (req, res, next) => {
        await parseToken(req.headers).then((token) => {
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
