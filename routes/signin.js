var express = require('express');
var router = express.Router();


router.post('/', passport.authenticate('local-login', {
    successRedirect : '/account', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true, // allow flash messages
    session: true
}));

module.exports = router;