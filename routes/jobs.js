var express = require('express');

var request = require('request');

var cheerio = require('cheerio');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    var params = req.params;
    var page = params.page;


    var onionUrl = "https://www.2beauti.com/wx/indexView?tmn=1";

    request(onionUrl,{},function (err, res, body) {

        console.log(body);

    })

});

module.exports = router;