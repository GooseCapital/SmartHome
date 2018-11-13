// expose our config directly to our application using module.exports
module.exports = {
    'facebookAuth': {
        'clientID': '176649286604155', // your App ID
        'clientSecret': '694ed5440bfb31a58ed5e0116e8511d8', // your App Secret
        'callbackURL': 'https://smarthome-nodejs.herokuapp.com/users/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields': ['id', 'email', 'name'] // For requesting permissions from Facebook API
    }
};