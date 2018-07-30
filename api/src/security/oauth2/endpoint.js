import request from 'request-promise';
import githubAuth from './github';
import googleAuth from './google';
import {User, Token} from '../../models/index';
import {httpError} from "./index";

function fromParam(provider) {
    switch (provider) {
        case 'github':
            return githubAuth;
        case 'google':
            return googleAuth;
        default:
            return undefined;
    }
}

function bodyParser(body, returns) {
    const data = {};

    for (let i = 0; i < returns.length; i += 1) {
        data[returns[i].mine] = body[returns[i].theirs];
    }
    return data;
}

export const makeToken = (tokenResponse, user) => {
    const token = {
        accessToken: tokenResponse.accessToken,
        user: user._id,
    };
    if ('expires' in tokenResponse && tokenResponse.expires) {
        const date = new Date(tokenResponse.expires);

        if (!isNaN(date)) {
            token.expires = date;
        }
    }
    if ('refreshToken' in tokenResponse && tokenResponse.refreshToken) {
        token.refreshToken = tokenResponse.refreshToken;
    }
    return token;
};

export default (app) => {
    app.get('/auth/:provider', (req, res) => {
        const provider = fromParam(req.params.provider);
        if (provider) {
            const uri = provider.config.code.getUri();

            res.send({uri});
            return;
        }
        httpError(res, 'Unknown provider', 400);
    });

    app.get('/auth/:provider/callback', async (req, res) => {
        const provider = fromParam(req.params.provider);
        provider.config.code.getToken(req.originalUrl)
            .then(async (token) => {
                await request({
                    headers: {
                        Authorization: `Bearer ${token.accessToken}`,
                        'User-Agent': 'Aos-Node-Js',
                    },
                    uri: provider.profile.url,
                    method: 'GET',
                }, (err, response, body) => {
                    if (response.statusCode === provider.profile.success) {
                        const user = JSON.parse(body);
                        const userInfo = bodyParser(user, provider.profile.returns);
                        User.findOne({username: userInfo.username}).then(async (fetchedUser) => {
                            let fetchedToken;

                            if (fetchedUser === null) {
                                userInfo.username = userInfo.username ? userInfo.username : userInfo.email;
                                fetchedUser = await new User(userInfo).save();
                                fetchedToken = await new Token(makeToken(token, fetchedUser)).save();
                            }
                            fetchedToken = await Token.findOne({user: fetchedUser._id}).populate('user', 'email username avatar _id');
                            const {accessToken, user} = fetchedToken;
                            res.send({accessToken, user});
                        });
                    } else {
                        res.statusCode = response.statusCode;
                        res.send(err);
                    }
                });
            }).catch(err => {
            httpError(res, `${err.toString()}. Try logging again or contact your credentials provider`, 401);
        });
    });
};
