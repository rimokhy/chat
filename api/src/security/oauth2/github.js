import ClientOAuth2 from 'client-oauth2';

export default {
  config: new ClientOAuth2({
    clientId: '3e22ddf242e3fe338cad',
    clientSecret: '79af286fede3cd5fd654cb57c6de56bae3de2dc7',
    accessTokenUri: 'https://github.com/login/oauth/access_token',
    authorizationUri: 'https://github.com/login/oauth/authorize',
    redirectUri: 'http://localhost:8080/auth/github/callback',
    scopes: ['user'],
  }),
  profile: {
    url: 'https://api.github.com/user',
    success: 200,
    returns: [{
      theirs: 'email',
      mine: 'email',
    }, {
      theirs: 'login',
      mine: 'username',
    }, {
      theirs: 'avatar_url',
      mine: 'avatar',
    }],
  },
};
