var express = require('express');
var router = express.Router();
var Site = require('../models/site');
var Equipment = require('../models/equipment');
var objectId = require('mongodb').ObjectID;  // mongo ID is an object ID not a string ID.


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

// router.get('/', function(req, res, next) {
//     // var currentUserId = req.session.passport.user;
//     var successMsg = req.flash('success')[0];
//     Site.find({user: req.user}, function (err, docs) {
//         var productChunks = [];
//         var chunkSize = 3;
//         for (var i = 0; i < docs.length; i += chunkSize) {
//             productChunks.push(docs.slice(i, i + chunkSize));
//         }
//         var equipments = {};
//         Equipment.find(function(err, docs){
//             equipments=docs;
//             console.log(equipments);
//             res.render('site/about', {sites: productChunks, successMsg: successMsg, noMessages: !successMsg, equipment_item: equipments});
//         })
//       //  res.render('site/about', {sites: productChunks, successMsg: successMsg, noMessages: !successMsg });
//     });
// });





// router.get('/about', isLoggedIn, function(req, res, next){
//     var result = {};
//     //assert.equal(null, err);
//     var getObject = function() {
//         User.findById(req.user.id, function (err, user){
//             var projects = {};
//             Portfolio.find({user: req.user}, function (err, docs) {
//                 projects = docs;
//                 result = user;
//                 res.render('user/about', {item: result, project_item: projects});
//             });
//         });
//     };
//     getObject();
// });



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