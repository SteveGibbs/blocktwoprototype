var express = require('express');
var router = express.Router();
var objectId = require('mongodb').ObjectID;  // mongo ID is an object ID not a string ID.
var User = require('../models/user');
var Portfolio = require('../models/portfolio');
var Site = require('../models/site');
var Equipment = require('../models/equipment');
var Vendorquote = require('../models/vendorquote');

//var url = process.env.MONGODB_URI;
var url = 'localhost:27017/blocktwo';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Block2' });
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

    // User.findById(req.user.id, function (err, user){
    //   var projects = {};
    //   Portfolio.find({user: req.user}, function (err, docs) {
    //     projects = docs;

   Site.findById({'_id': objectId(uniqueid)}, function (err, doc) {
  //    Site.findById(req.site.id, function (err, doc){
      //assert.equal(null, err);
      console.log('item found');
      console.log("this is the unique id of the site" + uniqueid);
      console.log(doc);
      console.log(doc.title);
      result = doc;

      var equipments = {};
        Equipment.find({site: objectId(uniqueid)}, function(err, doc) {
          console.log("THIS IS THE REQ.SITE" + req.equipment_name);
          console.log("this is the equipments unique id" + uniqueid);
          equipments = doc;
          console.log("yes this is" + equipments);
//             res.render('site/about', {sites: productChunks, successMsg: successMsg, noMessages: !successMsg, equipment_item: equipments});
//         })

          res.render('site/site', {item: result, equipment_item: equipments});
        })
    });
  };
  getObject();
});

router.get('/site/:id/equipment', function(req, res, next){
  var uniqueid = req.params.id;
  var result = {};
  //assert.equal(null, err);
  var getObject = function() {

    // User.findById(req.user.id, function (err, user){
    //   var projects = {};
    //   Portfolio.find({user: req.user}, function (err, docs) {
    //     projects = docs;

    Site.findById({'_id': objectId(uniqueid)}, function (err, doc) {
      //    Site.findById(req.site.id, function (err, doc){
      //assert.equal(null, err);
      console.log('item found');
      console.log("this is the unique id of the site" + uniqueid);
      console.log(doc);
      console.log(doc.title);
      result = doc;

      var equipments = {};
      Equipment.find({site: objectId(uniqueid)}, function(err, doc) {
        console.log("THIS IS THE REQ.SITE" + req.equipment_name);
        console.log("this is the equipments unique id" + uniqueid);
        equipments = doc;
        console.log("yes this is" + equipments);
//             res.render('site/about', {sites: productChunks, successMsg: successMsg, noMessages: !successMsg, equipment_item: equipments});
//         })

        res.render('site/equipment', {item: result, equipment_item: equipments});
      })
    });
  };
  getObject();
});

// router.get('/site/:id/equipment', function(req, res, next){
//   var uniqueid = req.params.id;
//   var result = {};
//   //assert.equal(null, err);
//   var getObject = function() {
//     Equipment.find(function (err, doc) {
//       //assert.equal(null, err);
//       console.log("this is the" + uniqueid);
//       console.log(doc);
//       // console.log(doc.title);
//       result = doc;
//       res.render('site/equipment', {item: result});
//     });
//   };
//   getObject();
// });

router.get('/site/:id/resources', function(req, res, next){
  var uniqueid = req.params.id;
  var result = {};

  var getObject = function() {
    Site.findById({'_id': objectId(uniqueid)}, function (err, doc) {
      result = doc;

      var users = {};
      User.find({site: objectId(uniqueid)}, function(err, doc) {
        users = doc;
        console.log("yes this is" + users);


        res.render('site/resources', {item: result, user_item: users});
      })
    });
  };
  getObject();
});

router.get('/site/:id/request', function(req, res, next){
    var uniqueid = req.params.id;
    var result = {};
    var getObject = function() {
    Site.findById({'_id': objectId(uniqueid)}, function (err, doc) {
      console.log(doc);
      result = doc;
      res.render('site/request', {item: result});
    });
  };
    getObject();
  });


router.post('/update_site', function(req, res, next){

  var item = {
    site_name: req.body.site_name,
    site_description: req.body.site_description,
    site_imagePath: req.body.site_imagePath,
    site_address_line1: req.body.site_address_line1,
    site_address_line2: req.body.site_address_line2,
    site_postal_code: req.body.site_postal_code,
    site_address_state: req.body.site_address_state
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
      res.redirect('/site');

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

router.post('/insert_equipment', function(req, res, next) {

  var equipmentId = req.body._id;
  console.log("this is the equipment id" + equipmentId);

  var item = {
    site: req.body.site,
    equipment_name: req.body.equipment_name,
    equipment_description: req.body.equipment_description,
    equipment_imagePath: req.body.equipment_imagePath
  };

  var equipments = new Equipment(item);


  var insertObject = function() {
    //assert.equal(null, err);
    equipments.save(item, function (err, result) {
      // assert.equal(null, err);
      console.log('item inserted');
      console.log(item);
      console.log(equipmentId);

      res.redirect('/site');
    });

  };
  insertObject();
});


router.post('/quote_vendor', function(req, res, next) {

  var vendorquoteId = req.body._id;
  console.log("this is the vendorquote id" + vendorquoteId);

  var item = {
    site: req.body.site,
    quote_experience: req.body.quote_experience,
    quote_category: req.body.quote_category,
    quote_requirements: req.body.quote_requirements,
    quote_duration: req.body.quote_duration,
    quote_rate: req.body.quote_rate
  };

  var vendorquotes = new Vendorquote(item);


  var insertObject = function() {
    //assert.equal(null, err);
    vendorquotes.save(item, function (err, result) {
      // assert.equal(null, err);
      console.log('item inserted');
      console.log(item);
      console.log(vendorquoteId);

      res.redirect('/site');
    });

  };
  insertObject();
});

router.post('/edit_equipment', function(req, res, next){

  var item = {
    //site:currentSiteId,
    site: req.body.site,
    equipment_name: req.body.equipment_name,
    equipment_description: req.body.equipment_description,
    equipment_imagePath: req.body.equipment_imagePath
  };

  var id = req.body.id;

  var editObject = function() {
    //assert.equal(null, err);
    //pass the id into the objectId function to transform it into an objectId that Mongo recognises as the
    // first parameter then use $set to say what the new data should be
    //$set just updates only the selected fields;
    Equipment.updateOne({'_id': objectId(id)}, {$set: item}, function (err, result) {

      // assert.equal(null, err);
      console.log('item updated');
      res.redirect('/site');

    });
  }
  editObject();

});

router.post('/delete_equipment', function(req, res, next){
  var id = req.body.id;
  console.log("this is the id" + id);

  var deleteObject = function() {
    //assert.equal(null, err);
    Equipment.deleteOne({'_id': objectId(id)}, function (err, user) {
      // assert.equal(null, err);
      console.log('item deleted');
      res.redirect('/site');

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
