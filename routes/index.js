var express = require('express');
var router = express.Router();

var Submission 		= require('../models/submission');



/* GET home page. */
router.get('/', function(req, res, next) {
    var loggedIn = false;

    if (req.isAuthenticated()) {
        loggedIn = true;
    }

    Submission.find({}, function(err, submissions) {
        //console.log('All submissions: ' + submissions);
        res.render('index', { flash: req.flash('flash'), loginMessage: req.flash('loginMessage'), signupMessage: req.flash('signupMessage'), loggedIn: loggedIn, submissions: submissions  });
    });

});



module.exports = router;
