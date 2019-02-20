var express = require('express');
var router = express.Router();
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

// const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
// console.log(dom.window.document.querySelector("p").textContent); // "Hello world"
// var e = dom.window.document.getElementById("sites");
//     var siteNumber = e.options[e.selectedIndex].value;
//     console.log("site number is " + siteNumber);



/* GET users listing. */
router.get('/', function(req, res, next) {
    // res.send('respond with a resource');
    // var site = $("select#sites").change(function(){
    //     var selectedSiteNumber = $(this).children("option:selected").val();
    //     alert("You have selected the country - " + selectedSiteNumber);
    // });


    var x = 5;
    var y = 5;
    var xy = x * y;

    // var e = dom.window.document.getElementById("sites");
    //     var siteNumber = e.options[e.selectedIndex].value;
    //     console.log("site number is " + siteNumber);

    res.render('plan', {xy});

});

module.exports = router;