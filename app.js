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

    return res.status( 200 ).send( req.file );

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





////////////////WEG
/*
express = require('express')
    , router = express.Router()
    , MongoClient = require('mongodb').MongoClient
    , ObjectId = require('mongodb').ObjectId
    , fs = require('fs-extra')
    // Your mongodb or mLabs connection string
    , url = 'mongodb://username:password@yourinstanced.mlab.com:29459/yourdb'
    , multer = require('multer')
    , util = require('util')
    , upload = multer({limits: {fileSize: 2000000 },dest:'/uploads/'})
// Default route http://localhost:3000/
router.get('/', function(req, res){ res.render('index'); });
// Form POST action handler
router.post('/uploadpicture', upload.single('picture'), function (req, res){
    if (req.file == null) {
        // If Submit was accidentally clicked with no file selected...
        res.render('index', { title:'Please select a picture file to submit!'); });
} else {
    MongoClient.connect(url, function(err, db){
        // read the img file from tmp in-memory location
        var newImg = fs.readFileSync(req.file.path);
        // encode the file as a base64 string.
        var encImg = newImg.toString('base64');
        // define your new document
        var newItem = {
            description: req.body.description,
            contentType: req.file.mimetype,
            size: req.file.size,
            img: Buffer(encImg, 'base64')
        };
        db.collection('yourcollectionname')
            .insert(newItem, function(err, result){
                if (err) { console.log(err); };
                var newoid = new ObjectId(result.ops[0]._id);
                fs.remove(req.file.path, function(err) {
                    if (err) { console.log(err) };
                    res.render('index', {title:'Thanks for the Picture!'});
                });
            });
    });
};
});


router.get('/picture/:picture', function(req, res){
// assign the URL parameter to a variable
    var filename = req.params.picture;
// open the mongodb connection with the connection
// string stored in the variable called url.
    MongoClient.connect(url, function(err, db){
        db.collection('yourcollectionname')
        // perform a mongodb search and return only one result.
        // convert the variabvle called filename into a valid
        // objectId.
            .findOne({'_id': ObjectId(filename)}, function(err, results){
// set the http response header so the browser knows this
// is an 'image/jpeg' or 'image/png'
                res.setHeader('content-type', results.contentType);
// send only the base64 string stored in the img object
// buffer element
                res.send(results.img.buffer);
            });
    });
});
*/