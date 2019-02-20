var express = require('express');
var router = express.Router();
var User = require('../models/user');
var objectId = require('mongodb').ObjectID;  // mongo ID is an object ID not a string ID.

router.get('/', function(req, res, next) {

    var result = {};
    //assert.equal(null, err);
    var getObject = function() {
        User.find(function (err, user){
            result = user;
            console.log(result);
            res.render('admin/users', {item: result});

        });
    };
    getObject();
    // res.render('admin/users', { title: '?' });
});



module.exports = router;