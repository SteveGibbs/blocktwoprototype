var express = require('express');
var router = express.Router();
var objectId = require('mongodb').ObjectID;  // mongo ID is an object ID not a string ID.
var User = require('../models/user');
var Portfolio = require('../models/portfolio');

//var url = process.env.MONGODB_URI;
var url = 'localhost:27017/blocktwo';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '?' });
});

router.get('/data/:id', function(req, res, next){
  var uniqueid = req.params.id;
  var result = {};
  //assert.equal(null, err);
  var getObject = function() {
    Portfolio.findOne({'_id': objectId(uniqueid)}, function (err, doc) {
      //assert.equal(null, err);
      console.log('item found');
      console.log(uniqueid);
      console.log(doc);
      console.log(doc.title);
      result = doc;
      res.render('user/projects', {item: result});
    });
  };
  getObject();
});

router.post('/update', function(req, res, next){

  var item = {
    portfolio_title: req.body.portfolio_title,
    portfolio_one_description: req.body.portfolio_one_description,
    portfolio_one_imagePath: req.body.portfolio_one_imagePath
  };

  var id = req.body.id;

  var editObject = function() {
    //assert.equal(null, err);
    //pass the id into the objectId function to transform it into an objectId that Mongo recognises as the
    // first parameter then use $set to say what the new data should be
    //$set just updates only the selected fields;
    Portfolio.updateOne({'_id': objectId(id)}, {$set: item}, function (err, result) {

      // assert.equal(null, err);
      console.log('item updated');
      res.redirect('/user/portfolio');

    });
  }
  editObject();

});

router.post('/delete', function(req, res, next){
  var id = req.body.id;

  var deleteObject = function() {
    //assert.equal(null, err);
    Portfolio.deleteOne({'_id': objectId(id)}, function (err, result) {
      // assert.equal(null, err);
      console.log('item deleted');
      res.redirect('/user/portfolio');

    });
  }
  deleteObject();
});

//Admin console CRUD for user management

router.post('/update_user', function(req, res, next){

  var item = {
    username: req.body.username,
    email: req.body.email

  };

  var id = req.body.id;

  var editObject = function() {
    //assert.equal(null, err);
    //pass the id into the objectId function to transform it into an objectId that Mongo recognises as the
    // first parameter then use $set to say what the new data should be
    //$set just updates only the selected fields;
    User.updateOne({'_id': objectId(id)}, {$set: item}, function (err, result) {

      // assert.equal(null, err);
      console.log('item updated');
      res.redirect('/admin');

    });
  }
  editObject();

});



router.post('/delete_user', function(req, res, next){
  var id = req.body.id;
  console.log("this is the id" + id);

  var deleteObject = function() {
    //assert.equal(null, err);
    User.deleteOne({'_id': objectId(id)}, function (err, user) {
      // assert.equal(null, err);
      console.log('item deleted');
      res.redirect('/admin');

    });
  }
  deleteObject();
});

//middleware so that only authenticated users can reach certain routes
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/user/signin');
}

//and for the opposite so that only not logged in users can reach certain routes
function notLoggedIn(req, res, next) {
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

module.exports = router;
