var express = require('express');
var router = express.Router();
var Site = require('../models/site');
var objectId = require('mongodb').ObjectID;  // mongo ID is an object ID not a string ID.

// router.get('/', function(req, res, next) {
//
//     var result = {};
//     //assert.equal(null, err);
//     var getObject = function() {
//         Site.find(function (err, site){
//             result = site;
//             console.log(result);
//             res.render('site/about', {item: result});
//
//         });
//     };
//     getObject();
//     // res.render('admin/users', { title: '?' });
// });

router.get('/', function(req, res, next) {
    // var currentUserId = req.session.passport.user;
    var successMsg = req.flash('success')[0];
    Site.find({user: req.user}, function (err, docs) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('site/about', {sites: productChunks, successMsg: successMsg, noMessages: !successMsg });
    });
});




// router.get('/portfolio', function(req, res, next) {
//     // var currentUserId = req.session.passport.user;
//     var successMsg = req.flash('success')[0];
//     Portfolio.find({user: req.user}, function (err, docs) {
//         // var result = docs.map(a => a.user);
//         // console.log(result);
//         // for (var i=0; i< result.length; i++ ){
//         // var portfolioUserId = result[i];
//         // if (portfolioUserId==currentUserId){
//         //     console.log("yippee");
//         // }
//         //     console.log("found");
//         // }
//         var productChunks = [];
//         var chunkSize = 3;
//         for (var i = 0; i < docs.length; i += chunkSize) {
//             productChunks.push(docs.slice(i, i + chunkSize));
//         }
//         res.render('user/portfolio', {portfolios: productChunks, successMsg: successMsg, noMessages: !successMsg });
//     });
// });





module.exports = router;