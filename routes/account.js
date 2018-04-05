var express = require('express');
var router = express.Router();

var User       		= require('../models/user');
var Submission      = require('../models/submission');

/* GET account page. */
router.get('/', isLoggedIn, function(req, res) {

    var upvotedSubs = {};
    var boughtSubs = {};
    var uploadedSubs = {};

    Submission.find({'upvotes.walletID' : req.user.walletID.toString()}, function(err, submissions) {

        console.log("req.user.walletID: " + req.user.walletID);

        if (!err) {
            upvotedSubs = submissions;
            //console.log("upvoted subs with same walletID : " + upvotedSubs);
            console.log('Rendering Account.. Upvoted Subs length: ' + upvotedSubs[0]);
        } else {
            console.log("couldnt find upvoted submissions.");
        }
        res.render('account', {wallet_id: req.user.walletID, email: req.user.email, password: '••••••', username: req.user.username, upvotedSubs: upvotedSubs, boughtSubs: boughtSubs, uploadedSubs: uploadedSubs} );
    });



});

/* Deleting user. */
router.delete('/delete', isLoggedIn, function (req, res) {


    if (req.isAuthenticated()) {
        User.findOneAndRemove({ _id: req.user._id }, function(err) {
            if (!err) {
                console.log("DELETE *****");


                req.logout();

                res.sendStatus(200);
            }
            else {
                console.log("DELETE ////////");

                res.sendStatus(500);
            }
        });
    }


});




// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        console.log("req.isAuthenticated() == TRUE");
        return next();
    } else {
        console.log("req.isAuthenticated() == FALSE");

        // if they aren't redirect them to the home page
        res.redirect('/');
    }


}


module.exports = router;
