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

        var endprices = [];

        //console.log("startprice: " + submissions[0].price + "submissions[0].upvotes.length : " + submissions[0].upvotes.length);

        for (var i = 0; i < submissions.length; i++) {
            //console.log("upvoter walletID: " + submission.upvotes[i].walletID);
            if (submissions[i].upvotes.length > 0) {

                var endprice = submissions[i].price * Math.pow(1.01, submissions[i].upvotes.length );
                endprices.push( endprice );
                console.log("endprice: " + endprice);
            } else {
                endprices.push( submissions[i].price );
            }

        }

        res.render('index', { personalWalletID: personalWalletID, flash: req.flash('flash'), loginMessage: req.flash('loginMessage'), signupMessage: req.flash('signupMessage'), loggedIn: loggedIn, submissions: submissions, endprices: endprices  });

    });

});



module.exports = router;
