//Add Prototype Objects to db
var mongoose = require('mongoose');

var Submission = require('/models/submission');
var User = require('/models/user');

mongoose.connect('mongodb://localhost/test', function (err) {
    if (err) throw err;

    console.log('Successfully connected');

    var maxMustermann = new User({
        _id: new mongoose.Types.ObjectId(),
        email: 'maxMustermann@gmail.com',
        username: 'maxMustermann',
        walletID: '0x21393rh31h4o13h',
        password: 'ichbinsMax'
    });

    maxMustermann.save(function(err) {
        if (err) throw err;

        console.log('User successfully saved.');

        var firstSubmission = new Submission({
            _id: new mongoose.Types.ObjectId(),
            title: 'Fire Icon',
            author: maxMustermann._id,
            buyer: maxMustermann, _id,
            upvotes: []
        });

        firstSubmission.save(function(err) {
            if (err) throw err;

            console.log('Book successfully saved.');
        });

    });
});



mongoose.connect('mongodb://localhost/test', function (err) {
    if (err) throw err;

    console.log('Successfully connected');

    Submission.find({
        title: 'Fire Icon'
    }).sort('-created')
        .limit(5)
        .exec(function(err, submissions) {
            if (err) throw err;

            console.log(submissions);
        });

    /*
    User.findById('59b31406beefa1082819e72f', function(err, author) {
        if (err) throw err;

        //author.linkedin = 'https://www.linkedin.com/in/jamie-munro-8064ba1a/';

        author.save(function(err) {
            if (err) throw err;

            console.log('Author updated successfully');
        });
    });
    */

});

