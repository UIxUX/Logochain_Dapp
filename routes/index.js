var express = require('express');
var router = express.Router();

var Submission 		= require('../models/submission');

const fs = require('fs');


/*

function createDummyJSONArray() {

}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

/* JSON test */
/*
function getDummyJSON() {
    var rawdata = fs.readFileSync('../../json/iconsubmission.json');
    var submissionObject = JSON.parse(rawdata);

    submissionObject.iconname = "JAWDWAD";

    return submissionObject;
}
/*





/* GET home page. */
router.get('/', function(req, res, next) {
    var loggedIn = false;

    if (req.isAuthenticated()) {
        loggedIn = true;
    }

    Submission.find({}, function(err, submissions) {
        console.log('All submissions: ' + submissions);
        res.render('index', { flash: req.flash('flash'), loggedIn: loggedIn, submissions: submissions  });
    });

});



module.exports = router;
