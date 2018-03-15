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
  res.render('index', { flash: req.flash('flash')  });

    if(req.session.page_views){
        req.session.page_views++;
        console.log('page has been viewed ' + req.session.page_views + "times this session.");
    } else {
        req.session.page_views = 1;
        console.log("page has been viewed for the first time this session.");
    }

});



module.exports = router;
