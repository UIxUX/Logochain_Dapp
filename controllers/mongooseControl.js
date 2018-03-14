/*var Submission = require('/models/submission');
var User = require('/models/users');*/
var mongoose = require('mongoose');

require('../models/user');
require('../models/submission');

//Import newly created models
var User = mongoose.model('User');
var Submission = mongoose.model('Submission');

/* //WORKS as example - with -> mongod in Terminal before to start db
mongoose.connect('mongodb://localhost/mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log( "we're connected!" );
});
*/

var methods = {};



methods.saveUserData = function (email, username, walletID, password) {

    mongoose.connect('mongodb://localhost/mongoose', function (err) {
        if (err) throw err;

        console.log('Successfully connected SAVE USERDATA');

        var userToSave = new User({
            _id: new mongoose.Types.ObjectId(),
            email: email,
            username: username,
            walletID: walletID,
            password: password
        });

        userToSave.save(function(err) {
            if (err) throw err;

            console.log('New User with username ' + username + " successfully saved.");

        });
    });

}


methods.retrieveUserDataWithId = function (id, cb) {
    mongoose.connect('mongodb://localhost/mongoose', function (err) {
        if (err) {
            return cb(null, null);
        };

        console.log('Successfully connected FIND USERDATA');

        User.find({
            _id: id
        }).sort('-created')
            .limit(1)
            .exec(function (err, user) {
                if (err) throw err;
                console.log(user);

                return cb(null, user);
            });
    });
}


methods.retrieveUserDataWithUsername = function (username, cb) {
    mongoose.connect('mongodb://localhost/mongoose', function (err) {
        if (err) {
            return cb(null, null);
        };

        console.log('Successfully connected FIND USERDATA');

        User.find({
            username: username
        }).sort('-created')
            .limit(1)
            .exec(function (err, user) {
                if (err) throw err;
                console.log(user);

                return cb(null, user);
            });
    });
}


//********** Test Functions **********

methods.saveTestData = function () {
    mongoose.connect('mongodb://localhost/mongoose', function (err) {
        if (err) throw err;

        console.log('Successfully connected SAVE');

        var testPerson1 = new User({
            _id: new mongoose.Types.ObjectId(),
            email: "max.mustermann@gmail.com",
            username: 'maxDesigner',
            walletID: '0x102948957830183192',
            password: '12345'
        });


        testPerson1.save(function(err) {
            if (err) throw err;

            console.log('New User successfully saved.');

            var testSubmission1 = new Submission({
                _id: new mongoose.Types.ObjectId(),
                title: 'Max Logo',
                author: testPerson1._id,
            });

            testSubmission1.save(function(err) {
                if (err) throw err;

                console.log('Submission successfully saved.');
            });
        });
    });
}


methods.retrieveTestData = function () {
    mongoose.connect('mongodb://localhost/mongoose', function (err) {
        if (err) throw err;

        console.log('Successfully connected FIND');

        Submission.find({
            title: 'Max Logo'
        }).sort('-created')
            .limit(5)
            .exec(function (err, submissions) {
                if (err) throw err;

                console.log(submissions);
            });
    });
}

module.exports = methods;