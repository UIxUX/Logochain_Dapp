var express = require('express');
var router = express.Router();

//require('../controllers/mongooseControl');
var mongooseControls = require('../controllers/mongooseControl');


/*
router.post('/', passport.authenticate('local-login', { failureRedirect: '/' }), function(req, res) {
    res.redirect('/account');
});
*/

router.post('/', passport.authenticate('local-login', {
    successRedirect : '/account', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

module.exports = router;