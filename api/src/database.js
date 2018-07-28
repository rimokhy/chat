import mongoose from 'mongoose';
import {MONGO_DATABASE_NAME, MONGO_URI} from './config';
import {User, Token} from './models';

const AOS_ENV = process.env.AOS_ENV || '';

async function dropCollection(model, name) {
    const user = await model.remove();
    console.info(`Cleared ${name} collection : ${JSON.stringify(user)}`);
}

export const dbConnect = () => mongoose.connect(`${MONGO_URI}/${MONGO_DATABASE_NAME}`)
    .then(async () => {
        console.log(`Successfully connected to mongo [${MONGO_DATABASE_NAME}]`);

        if (AOS_ENV === 'test') {
            await dropCollection(User, 'user');
            await dropCollection(Token, 'token');
            const user = await new User({email: 'email', username: 'username'}).save();
            const token = await new Token({user: user._id, accessToken: 'lol'}).save()
            console.log(`Created token ${token}`)
        }
    })
    .catch((err) => {
        throw err;
    });
