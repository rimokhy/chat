import ClientOAuth2 from 'client-oauth2';

export default {
  config: new ClientOAuth2({
    clientId: '549211362450-ilqr6ajih4ib1pf9o06jdiqojuh0r388.apps.googleusercontent.com',
    clientSecret: 'U3s3K7cCUZpJfsqByg9KsU3A',
    accessTokenUri: 'https://www.googleapis.com/oauth2/v3/token',
    authorizationUri: 'https://accounts.google.com/o/oauth2/auth',
    redirectUri: 'http://localhost:8080/auth/google/callback',
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
