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

//Uploading
var Submission 		= require('./models/submission');
var multer 		=		require( 'multer' );
var storage = multer.diskStorage(
    {
        destination: 'uploads/',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
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

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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
    req.logout();
    req.flash('flash', 'You successfully logged out.');
    res.redirect('/');
    console.log("Logged out!");
});

//Upvote
app.post('/upvote', function(req, res) {

    var query = {index: req.body.selectedIndex};

    var upvoterWalletID = req.body.upvotingWallet;
    console.log("Upvoted Route with WalletID: " + upvoterWalletID + " and Index: " + req.body.selectedIndex);

    Submission.findOneAndUpdate(query,
        {$addToSet: { "upvotes": {
                    user: upvoterWalletID, createdAt: Date.now() } } },  {upsert: true, new: true},
        function(err, sub){

        if (sub == null || sub == undefined) {
            console.log("couldn't find sub.");
        }

        if (err) {
            console.log("Error Upvoting.");
            return res.sendStatus(500);
        }
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

    console.log("price is " + req.body.price + "   title is " + req.body.title + " req.user is " + req.user + "Filename : " + req.file.path);

    var newSubmission            = new Submission();

    Submission.count({}, function(err, count){
        console.log( "Number of subs: ", count );

        newSubmission.index = count;
    });

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
    //newSubmission.upvotes;

    // save the user
    newSubmission.save(function(err) {
        if (err)
            throw err;
        //return done(null, newUser);
    });

    return res.redirect(200, '/');

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




