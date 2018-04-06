var express = require('express');
var router = express.Router();

var Submission 		= require('../models/submission');



/* GET home page. */
router.get('/', function(req, res, next) {
    var loggedIn = false;
    var personalWalletID = -1;

    if (req.isAuthenticated()) {
        loggedIn = true;
        personalWalletID = req.user.walletID;
    }

    Submission.find({}, function(err, submissions) {
        //console.log('All submissions: ' + submissions);
        res.render('index', { personalWalletID: personalWalletID, flash: req.flash('flash'), loginMessage: req.flash('loginMessage'), signupMessage: req.flash('signupMessage'), loggedIn: loggedIn, submissions: submissions  });
    });

});



module.exports = router;
