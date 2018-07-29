import ClientOAuth2 from 'client-oauth2';

export default {
    config: new ClientOAuth2({
        clientId: '549211362450-bljp45257evj8ri0gkiombjql8p7ovpb.apps.googleusercontent.com',
        clientSecret: 'WtG8XX9MB9qaIzgXqHFH4CQJ',
        accessTokenUri: 'https://www.googleapis.com/oauth2/v3/token',
        authorizationUri: 'https://accounts.google.com/o/oauth2/auth',
        redirectUri: 'http://localhost:3000/login?provider=google',
        scopes: ['profile', 'email'],
    }),
    profile: {
        url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        success: 200,
        returns: [{
            theirs: 'email',
            mine: 'email',
        }, {
            theirs: 'name',
            mine: 'username',
        }, {
            theirs: 'picture',
            mine: 'avatar',
        }],
    },
};
