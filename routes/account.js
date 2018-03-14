var express = require('express');
var router = express.Router();


/* GET account page. */
router.get('/', require('connect-ensure-login').ensureLoggedIn("/"), function(req, res, next) {
    console.log('Rendering Account..');
    res.render('account', {wallet_id: '', email: '', password: '', username: ''} );
});

/* Deleting user. */
router.delete('/delete/:id', function (req, res) {
   console.log(req.params.id);
});



module.exports = router;
