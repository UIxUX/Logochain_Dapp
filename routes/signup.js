var express = require('express');
var router = express.Router();
var passport = global.passport;

//require('../controllers/mongooseControl');
var mongooseControls = require('../controllers/mongooseControl');

var passportControl = require('../passport/passportControl');

router.post('/',  function(req, res, next) {

    req.checkBody('wallet_id', 'Specify Wallet ID').notEmpty();
    req.checkBody('email', 'Specify Email').notEmpty();
    req.checkBody('password', 'Specify Password').notEmpty();
    req.checkBody('username', 'Specify Username').notEmpty();

    var errors = req.validationErrors();
    console.log('errors in req.checkbody: ');
    console.log(errors);

    if (errors) {
        console.log('Errors!');
        res.sendStatus(500);

    } else {
        console.log("Errors ist false");
        var newUser = {
            wallet_id: req.body.wallet_id,
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        };

        mongooseControls.saveUserData(newUser.email, newUser.username, newUser.wallet_id, newUser.password);
        console.log('new user: ' + newUser.username + ' created');

        passport.authenticate('local-signin')(req, res, function () {
            //res.redirect('/');
            console.log("authenticated");
        });

        res.sendStatus(200);

    }

});


module.exports = router;