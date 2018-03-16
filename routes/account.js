var express = require('express');
var router = express.Router();


/* GET account page. */
router.get('/', isLoggedIn, function(req, res) {
    console.log('Rendering Account..');
    res.render('account', {wallet_id: req.user.walletID, email: req.user.email, password: '••••••', username: req.user.username} );
});

/* Deleting user. */
router.delete('/delete', isLoggedIn, function (req, res) {


    var loggedIn = false;

    if (req.isAuthenticated()) {
        loggedIn = true;
    }

    req.flash('flash', 'Your account got successfully deleted.');

    res.render('index', { flash: req.flash('flash'), loggedIn: loggedIn  });
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
