var express = require('express');
var router = express.Router();

var User       		= require('../models/user');
var Submission      = require('../models/submission');

/* GET account page. */
router.get('/', isLoggedIn, function(req, res) {

    var upvotedSubs = {};
    var boughtSubs = {};
    var uploadedSubs = {};

    Submission.find({'upvotes.walletID' : req.user.walletID.toString()}, function(err, upvotedsubmissions) {

        console.log("req.user.walletID: " + req.user.walletID);

        if (!err) {
            upvotedSubs = upvotedsubmissions;
            //console.log("upvoted subs with same walletID : " + upvotedSubs);
            //console.log('Rendering Account.. Upvoted Subs length: ' + upvotedSubs[0]);
        } else {
            console.log("couldnt find upvoted submissions.");
        }

        Submission.find({'author' : req.user._id.toString()}, function(err, uploadedsubmissions) {

            if (!err) {
                uploadedSubs = uploadedsubmissions;
                //console.log("upvoted subs with same walletID : " + upvotedSubs);
                console.log('Rendering Account.. Upvoted Subs length: ' + uploadedSubs[0]);
            } else {
                console.log("couldnt find uploaded submissions.");
            }





            //Endprices of Upvoted Subs
            var endpricesupvotedsubs = [];
            for (var i = 0; i < upvotedSubs.length; i++) {
                //console.log("upvoter walletID: " + submission.upvotes[i].walletID);
                if (upvotedSubs[i].upvotes.length > 0) {

                    var endprice = upvotedSubs[i].price * Math.pow(1.01, upvotedSubs[i].upvotes.length );
                    endpricesupvotedsubs.push( endprice );

                } else {
                    endpricesupvotedsubs.push( upvotedSubs[i].price );
                }
            }

            //Endprices of Uploaded Subs
            var endpricesuploadedsubs = [];
            for (var i = 0; i < uploadedSubs.length; i++) {
                //console.log("upvoter walletID: " + submission.upvotes[i].walletID);
                if (uploadedSubs[i].upvotes.length > 0) {

                    var endprice = uploadedSubs[i].price * Math.pow(1.01, uploadedSubs[i].upvotes.length );
                    endpricesuploadedsubs.push( endprice );

                } else {
                    endpricesuploadedsubs.push( uploadedSubs[i].price );
                }
            }

            //Endprices of Bought Subs
            var endpricesboughtsubs = [];
            for (var i = 0; i < boughtSubs.length; i++) {
                //console.log("upvoter walletID: " + submission.upvotes[i].walletID);
                if (boughtSubs[i].upvotes.length > 0) {

                    var endprice = boughtSubs[i].price * Math.pow(1.01, boughtSubs[i].upvotes.length );
                    endpricesboughtsubs.push( endprice );

                } else {
                    endpricesboughtsubs.push( boughtSubs[i].price );
                }
            }






            res.render('account', {wallet_id: req.user.walletID, email: req.user.email, password: '••••••', username: req.user.username, upvotedSubs: upvotedSubs, boughtSubs: boughtSubs, uploadedSubs: uploadedSubs, endpricesupvotedsubs: endpricesupvotedsubs, endpricesuploadedsubs: endpricesuploadedsubs, endpricesboughtsubs: endpricesboughtsubs} );
        });


        //res.render('account', {wallet_id: req.user.walletID, email: req.user.email, password: '••••••', username: req.user.username, upvotedSubs: upvotedSubs, boughtSubs: boughtSubs, uploadedSubs: uploadedSubs} );
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
