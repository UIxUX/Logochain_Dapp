var express = require('express');
var router = express.Router();

var expressValidator = require("express-validator");

router.post('/', function(req, res, next) {

    req.checkBody('wallet_id', 'Specify Wallet ID').notEmpty();
    req.checkBody('email', 'Specify Email').notEmpty();
    req.checkBody('password', 'Specify Password').notEmpty();
    req.checkBody('username', 'Specify Username').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        console.log('Errors!');
    } else {
        var newUser = {
            wallet_id: req.body.wallet_id,
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        }
        console.log('new user: ' + newUser.username + ' created');
    }


});

module.exports = router;