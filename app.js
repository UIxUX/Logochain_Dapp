//Relevante Github Repositories:
//https://github.com/UIxUX/Logochain_Nodejs
//https://github.com/UIxUX/logochain
//https://docs.google.com/document/d/1mvqPtnLEe7Fp3o4w939bMveb5SvMQHLwAACaK6F8Qtg/edit?usp=sharing


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash    = require('connect-flash');
var fs = require("fs");
global.passport = require('passport');

var expressValidator = require("express-validator");

//Finding User
var User = require('./models/user');

//Uploading
var Submission 		= require('./models/submission');
var multer 		=		require( 'multer' );
var storage = multer.diskStorage(
    {
        destination: 'uploads/',
        filename: function ( req, file, cb ) {

            cb( null, file.originalname);
        }
    }
);
var upload 		= 	multer( { storage: storage } );
var sizeOf 		= 	require( 'image-size' );
require( 'string.prototype.startswith' );

// Configuring MongoDB
global.mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/mongoose');

// Configuring Passport
require('./passport/passport')(global.passport);
var session = require('express-session');
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: false }));
app.use(global.passport.initialize());
app.use(global.passport.session());
app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Global vars
app.use(function(req,res,next){
  res.locals.errors = null;
  next();
});


app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator());

// ROUTES
var index = require('./routes/index');
var users = require('./routes/users');
var account = require('./routes/account');
var signup = require('./routes/signup');
var signin = require('./routes/signin');


app.use('/', index);
app.use('/users', users);


//account site
app.use('/account', account);
app.use('/account/delete', account);


//Sign up
app.use('/signup', signup);

//Sign in
app.use('/signin', signin);

//Logout
app.get('/logout', function(req, res) {
    //req.session.destroy();
    req.logout();
    req.flash('flash', 'You successfully logged out.');
    res.redirect('/');
    console.log("Logged out!");
});

//Upvote
app.post('/upvote', function(req, res) {

    var upvoterWalletID = req.body.upvotingWallet;


    if (req.isAuthenticated()) {
        if (req.user != null) {
            console.log("Req.user.walletID" + req.user.walletID);
            upvoterWalletID = req.user.walletID;
        }
    }


    var query = {'_id': req.body.selectedID};

    var options = {safe: true, upsert: true};

    Submission.findOne({'_id' : req.body.selectedID}, function(err, submission) {

        if (err) return res.sendStatus(500, "");

        var price = submission.price;
        var amountVotes = submission.upvotes.length;
        console.log("****PRICE: " + price);

        Submission.find({'upvotes.walletID' : upvoterWalletID}, function(err, submissions) {
            var subs = submissions;
            if (subs > 5) {
                console.log("***** Already upvoted with the same WalletID more than 5 times! *****");
                return res.sendStatus(500, "Already upvoted with the same WalletID more than 5 times!");
            } else {

                for (sub in subs) {
                    if (sub._id == selectedID) {
                        console.log("***** Already upvoted with the same WalletID! *****");
                        return res.sendStatus(500, "Already upvoted with the same WalletID!");
                    }
                }

                var update = {$push: {"upvotes": { 'walletID':  "" + upvoterWalletID, 'createdAt': Date.now() } }, $set: { 'price': price * Math.pow(1.01, amountVotes+1) }};
                console.log("NEW PRICE: " + price * Math.pow(1.01, amountVotes+1));

                Submission
                    .findOneAndUpdate(query, update, options).exec(function(err, sub){

                    if (err) {
                        console.log("Error Upvoting.");
                        return res.sendStatus(500);
                    } else {
                        return res.redirect(200, "/");
                    }
                });
            }
        });

    });
});


// TO DELETE ALL DATA  - in Terminal: mongo mongoose --eval "db.dropDatabase();"

//For Uploading a submission
app.post( '/upload', upload.single( 'file' ), function( req, res, next ) {

    if ( !req.file.mimetype.startsWith( 'image/' ) ) {
        return res.status( 422 ).json( {
            error : 'The uploaded file must be an image'
        } );
    }

    var dimensions = sizeOf( req.file.path );

    if ( ( dimensions.width < 640 ) || ( dimensions.height < 480 ) ) {
        return res.status( 422 ).json( {
            error : 'The image must be at least 640 x 480px'
        } );
    }

    //console.log("price is " + req.body.price + "   title is " + req.body.title + " req.user is " + req.user + "Filename : " + req.file.path);

    var newSubmission            = new Submission();

    var indexSubmission = 0;

    Submission.count({}, function(err, count){
        console.log( "Number of subs: ", count );

        indexSubmission = count;
    });

    newSubmission.docindex = indexSubmission;

    var title = req.body.title;
    var price = req.body.price;

    // set the submissions attributes
    newSubmission._id = mongoose.Types.ObjectId();

    newSubmission.title = title;


    var newImg = fs.readFileSync(req.file.path); //req.file.buffer;
    var encImg = newImg.toString('base64');


    newSubmission.icon.data = encImg;
    newSubmission.icon.contentType = req.file.mimetype;
    newSubmission.author = req.user._id;
    newSubmission.price = price;
    //newSubmission.index = price;
    //newSubmission.upvotes;

    // save the user
    newSubmission.save(function(err) {

        if (err)
            throw err;
        //return done(null, newUser);
    });

    return res.redirect(200, '/');

});

// API for Smart Contract
//
//Works
app.get('/api/getprice/:id', function(req, res) {
    var id = req.params.id;

    //Find Submission with SubmissionID
    Submission.findOne({'_id' : id}, function(err, submission) {

        if (err) return res.send("Not found");

        var price = [submission.price];
        console.log("****PRICE: " + price);

        return res.send(price);
    });
});

//Works
app.get('/api/getrecipient/:id', function(req, res) {
    var id = req.params.id;

    //Find Submission with SubmissionID
    Submission.findOne({'_id' : id}, function(err, submission) {

        if (err) return res.send("Not found");

        var recipientid = submission.author;
        console.log("****recipientid " + recipientid);

        //Find User with SubmissionAuthorID
        User.findById( recipientid, function(err, user) {

            if (err)
                return res.send("Not found");;

            if (user) {
                var recipientwalletid = [user.walletID];

                return res.send(recipientwalletid);
            } else {
                return res.send("Not found");
            }
        });
    });
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


