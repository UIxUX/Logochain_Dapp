var express = require('express');
var router = express.Router();

/* JSON test */
function getDummyJSON() {
    var json = '{ "h1": "Hallo", "h2": "Julian" }';
    var jsonObject = JSON.parse(json);

    return jsonObject;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Get Request **********");
  res.render('index', { h1: getDummyJSON().h1 });
});



module.exports = router;
