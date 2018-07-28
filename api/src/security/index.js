import bodyParser from 'body-parser';
import uuid from 'uuid/v4';
import {Token, User} from "../models";
import {getTokenError, httpError, validateToken} from "./oauth2";
import mongoose from "mongoose";

const {ObjectId} = mongoose.Schema.Types;

const parseHeader = async (headers) => {
    const authHeader = headers.authorization || '';

    if (authHeader.startsWith('Basic ')) {
        const creds = authHeader.substring(6, authHeader.length);
        const b64 = Buffer.from(creds, 'base64').toString('ascii');
        let [username, password] = b64.split(':');
        const user = await User.findOne({'username': username});

        // TODO: handleEncryption password
        if (user && user.password === password) {
            const token = await Token.findOne({user: user._id}).populate('user', 'email username avatar _id');
            getTokenError(token);
            return token;
        }
        throw new Error('Authentication failed');
    }
    throw new Error('Missing Credentials');
};

const createToken = async (user) => {
    try {
        return await new Token({accessToken: uuid(), user: user._id}).save();
    } catch (err) {
        return createToken();
    }
};

const register = async (data) => {
    try {
        const user = await new User(data).save();
        return await createToken(user);
    }
    catch (e) {
        throw new Error('username is not unique')
    }
};

export default (app) => {
    app.post('/auth/register', bodyParser.json(), async (req, res) => {
        await register(req.body)
            .then(token => {
                const { accessToken, user } = token;
                res.send({accessToken, user})
            })
            .catch(err => httpError(res, err.toString(), 401));
    });
    app.post('/login', bodyParser.json(), async (req, res) => {
        await parseHeader(req.headers)
            .then(token => {
                const { accessToken, user } = token;
                res.send({accessToken, user})
            })
            .catch(err => httpError(res, err.toString(), 401));
    });
}