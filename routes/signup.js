var express = require('express');
var router = express.Router();



router.post('/', function(req, res, next) {

    req.checkBody('wallet_id', 'Specify Wallet ID').notEmpty();
    req.checkBody('email', 'Specify Email').notEmpty();
    req.checkBody('password', 'Specify Password').notEmpty();
    req.checkBody('username', 'Specify Username').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        console.log('Errors!');
        res.status(500);
        res.send('The Account with the username ' + res.body.username + " could not get created.");

    } else {
        var newUser = {
            wallet_id: req.body.wallet_id,
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        };
        console.log('new user: ' + newUser.username + ' created');
        res.render('account', {wallet_id: newUser.wallet_id, email: newUser.email, password: newUser.password, username:newUser.username});
    }

});

module.exports = router;