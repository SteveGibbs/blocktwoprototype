var express = require('express');
var router = express.Router();
var objectId = require('mongodb').ObjectID;  // mongo ID is an object ID not a string ID.
var User = require('../models/user');
var Portfolio = require('../models/portfolio');
var Site = require('../models/site');

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

router.get('/site/:id', function(req, res, next){
  var uniqueid = req.params.id;
  var result = {};
  //assert.equal(null, err);
  var getObject = function() {
    Site.findOne({'_id': objectId(uniqueid)}, function (err, doc) {
      //assert.equal(null, err);
      console.log('item found');
      console.log(uniqueid);
      console.log(doc);
      console.log(doc.title);
      result = doc;
      res.render('site/site', {item: result});
    });
  };
  getObject();
});

router.post('/update_site', function(req, res, next){

  var item = {
    site_name: req.body.site_name,
    site_description: req.body.site_description,
    site_imagePath: req.body.site_imagePath
  };

  var id = req.body.id;

  var editObject = function() {
    //assert.equal(null, err);
    //pass the id into the objectId function to transform it into an objectId that Mongo recognises as the
    // first parameter then use $set to say what the new data should be
    //$set just updates only the selected fields;
    Site.updateOne({'_id': objectId(id)}, {$set: item}, function (err, result) {

      // assert.equal(null, err);
      console.log('item updated');
      res.redirect('/site/site');

    });
  }
  editObject();

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

router.post('/delete_site', function(req, res, next){
  var id = req.body.id;

  var deleteObject = function() {
    //assert.equal(null, err);
    Site.deleteOne({'_id': objectId(id)}, function (err, result) {
      // assert.equal(null, err);
      console.log('item deleted');
      res.redirect('/site');

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

router.post('/insert_site', function(req, res, next) {
  var currentUserId = req.session.passport.user;

  var siteId = req.body._id;
  console.log("this is the site id" + siteId);

  var item = {
    user:currentUserId,
    site_name: req.body.site_name,
    site_description: req.body.site_description,
    site_imagePath: req.body.site_imagePath
  };

  var sites = new Site(item);


  var insertObject = function() {
    //assert.equal(null, err);
    sites.save(item, function (err, result) {
      // assert.equal(null, err);
      console.log('item inserted');
      console.log(item);
      console.log(siteId);
      // User.update({_id:currentUserId},
      //     {$addToSet: {"portfolios": portfolioId}},
      //     {safe: true, upsert: true, new : true},
      //     function(err, model) {
      //         console.log(model);
      //     }
      // );

      res.redirect('/site');
    });

  };
  insertObject();
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