var express = require('express');
var router = express.Router();



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
  console.log("Get Request **********");
  res.render('index', { });
});



module.exports = router;
