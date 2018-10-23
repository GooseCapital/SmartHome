var LocalStrategy = require('passport-local').Strategy;
var mysql = require('../model/mysql')
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');
var User = require('./user')

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async (username, done) => {
        let sql = `SELECT * FROM users WHERE id = ?`;
        let result = await mysql.query(sql, [username]);
        if (result[0]) {
            let user1 = new User(result[0].Id, result[0].username, result[0].password, result[0].email, result[0].fbid, result[0].image, result[0].fbName);
            done(null, user1);
        } else
            done(null, false);
    });

    passport.use(new LocalStrategy(
        async (username, password, done) => {
            let sql = `SELECT * FROM users WHERE username = ?`;
            let result = await mysql.query(sql, [username]);
            if (result[0]) {
                let user1 = new User(result[0].Id, result[0].username, result[0].password, result[0].email, result[0].fbid, result[0].image, result[0].fbName);
                if (user1.password == password) {
                    return done(null, user1);
                }
            }
            return done(null, false);
        }
    ))

    passport.use(new FacebookStrategy({
            // pull in our app id and secret from our auth.js file
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL,
            profileFields: ['id', 'emails', 'name']
        },
        // facebook will send back the token and profile
        function (token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(async () => {
                // find the user in the database based on their facebook id
                let sql = `SELECT * FROM users WHERE fbid = ?`;
                let result = await mysql.query(sql, [profile.id]);
                // if the user is found, then log them in
                if (result[0]) {
                    let user = new User(result[0].Id, result[0].username, result[0].password, result[0].email, result[0].fbid, result[0].image, result[0].fbName);
                    return done(null, user);
                } else {
                    // if there is no user found with that facebook id, create them
                    let user = new User();
                    user.email = profile.emails[0].value;
                    user.fbid = profile.id;
                    user.image = `http://graph.facebook.com/${profile.id}/picture?type=large`;
                    user.fbName = profile.name.familyName + ' ' + profile.name.givenName;
                    // save our user to the database
                    await mysql.addFbUser(user);
                    let sql = `SELECT * FROM users WHERE fbid = ?`;
                    let result = await mysql.query(sql, [profile.id]);
                    let user1 = new User(result[0].Id, result[0].username, result[0].password, result[0].email, result[0].fbid, result[0].image, result[0].fbName);
                    return done(null, user1);
                }
            });
        }
    ));
}