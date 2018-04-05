
var LocalStrategy   = require('passport-local').Strategy;


var User       		= require('../models/user');


module.exports = function(passport) {


    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });


    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


    passport.use('local-signup', new LocalStrategy({

            usernameField : 'walletID',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, walletID, password, done) {


            User.findOne({ 'walletID' :  walletID }, function(err, user) {

                if (err)
                    return done(err);


                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That walletID is already taken.'));
                } else {

                    var newUser            = new User();

                    var username = req.body.username;
                    var walletID = req.body.walletID;
                    var email = req.body.email;


                    newUser._id = mongoose.Types.ObjectId();

                    newUser.email    = email;
                    newUser.password = newUser.generateHash(password); // use the generateHash function in our user model
                    newUser.username = username;
                    newUser.walletID = walletID;

                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }

            });

        }));


    passport.use('local-login', new LocalStrategy({

            usernameField : 'walletID',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, walletID, password, done) {


            User.findOne({ 'walletID' :  walletID }, function(err, user) {

                if (err)
                    return done(err);

                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No existing user found. Please Register!'));

                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oh! Wrong password.'));

                return done(null, user);
            });

        }));

};
