var express = require('express');
var router = express.Router();

//require('../controllers/mongooseControl');
var mongooseControls = require('../controllers/mongooseControl');



router.post('/', passport.authenticate('local-login', { failureRedirect: '/' }), function(req, res) {
    res.redirect('/account');
});

module.exports = router;