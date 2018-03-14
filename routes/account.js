var express = require('express');
var router = express.Router();


/* GET account page. */
router.get('/', isLoggedIn, function(req, res) {
    console.log('Rendering Account..');
    res.render('account', {wallet_id: req.user.walletID, email: req.user.email, password: req.user.password, username: req.user.username} );
});

/* Deleting user. */
router.delete('/delete/:id', function (req, res) {
   console.log(req.params.id);
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
