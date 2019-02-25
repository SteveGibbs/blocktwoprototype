var express = require('express');
var router = express.Router();
//var csrf = require('csurf');
var passport = require('passport');
var objectId = require('mongodb').ObjectID;  // mongo ID is an object ID not a string ID.
var User = require('../models/user');
var Portfolio = require('../models/portfolio');

//var csrfProtection = csrf();
// router.use(csrfProtection); //protects the routes using csrfProtection

router.get('/profile', isLoggedIn, function(req, res, next){
    //var uniqueid = req.params.id;
    var result = {};
    //assert.equal(null, err);
    var getObject = function() {
        User.findById(req.user.id, function (err, user){

        //User.findOne({'_id': objectId(uniqueid)}, function (err, doc) {
            //assert.equal(null, err);
            result = user;
            res.render('user/profile', {item: result});
        });
    };
    getObject();
    console.log(result);

});  //order is important

router.get('/about', isLoggedIn, function(req, res, next){
    var result = {};
    //assert.equal(null, err);
    var getObject = function() {
        User.findById(req.user.id, function (err, user){
            var projects = {};
            Portfolio.find({user: req.user}, function (err, docs) {
                projects = docs;
                result = user;
                res.render('user/about', {item: result, project_item: projects});
            });
        });
    };
    getObject();
});

router.get('/portfolio', function(req, res, next) {
    // var currentUserId = req.session.passport.user;
    var successMsg = req.flash('success')[0];
    Portfolio.find({user: req.user}, function (err, docs) {
        // var result = docs.map(a => a.user);
        // console.log(result);
        // for (var i=0; i< result.length; i++ ){
        // var portfolioUserId = result[i];
        // if (portfolioUserId==currentUserId){
        //     console.log("yippee");
        // }
        //     console.log("found");
        // }
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('user/portfolio', {portfolios: productChunks, successMsg: successMsg, noMessages: !successMsg });
    });
});



router.post('/profile-details', function(req, res, next){
    var uniqueid = req.params.id;
    var result = {};

    var item = {
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        membership_number: req.body.membership_number,
        imagePath: req.body.imagePath,
        description: req.body.description,
        home_address_line1: req.body.home_address_line1,
        home_address_line2: req.body.home_address_line2,
        postal_code: req.body.postal_code,
        address_state: req.body.address_state,
        address_country: req.body.address_country

    };

    var id = req.body.id;

    var editObject = function() {
        //assert.equal(null, err);
        //pass the id into the objectId function to transform it into an objectId that Mongo recognises as the
        // first parameter then use $set to say what the new data should be
        //$set just updates only the selected fields;
        User.updateOne({'_id': objectId(id)}, {$set: item}, function (err, result) {
          //  assert.equal(null, err);
            console.log(item);
            res.redirect('/user/profile');

        });
    }
    editObject();

});

router.post('/profile-qualifications', function(req, res, next){
    var uniqueid = req.params.id;
    var result = {};

    var item = {
        provider_one: req.body.provider_one,
        qualification_one: req.body.qualification_one,
        provider_two: req.body.provider_two,
        qualification_two: req.body.qualification_two,
        provider_three: req.body.provider_three,
        qualification_three: req.body.qualification_three,
        provider_four: req.body.provider_four,
        qualification_four: req.body.qualification_four,
        visa_status: req.body.visa_status,
        licence_one: req.body.licence_one,
        licence_one_expiry: req.body.licence_one_expiry,
        licence_two: req.body.licence_two,
        licence_three: req.body.licence_three,
        licence_four: req.body.licence_four
    };

    var id = req.body.id;

    var editObject = function() {
        //assert.equal(null, err);
        //pass the id into the objectId function to transform it into an objectId that Mongo recognises as the
        // first parameter then use $set to say what the new data should be
        //$set just updates only the selected fields;
        User.updateOne({'_id': objectId(id)}, {$set: item}, function (err, result) {
            //  assert.equal(null, err);
            console.log(item);
            res.redirect('/user/profile');

        });
    }
    editObject();

});


router.post('/insert', function(req, res, next) {
    var currentUserId = req.session.passport.user;

    var portfolioId = req.body._id;
    console.log("this is the portfolio id" + portfolioId);

    var item = {
        user:currentUserId,
        portfolio_title: req.body.portfolio_title,
        portfolio_one_description: req.body.portfolio_one_description,
        portfolio_one_imagePath: req.body.portfolio_one_imagePath
    };

    var portfolios = new Portfolio(item);


    var insertObject = function() {
        //assert.equal(null, err);
        portfolios.save(item, function (err, result) {
            // assert.equal(null, err);
            console.log('item inserted');
            console.log(item);
            console.log(portfolioId);
            // User.update({_id:currentUserId},
            //     {$addToSet: {"portfolios": portfolioId}},
            //     {safe: true, upsert: true, new : true},
            //     function(err, model) {
            //         console.log(model);
            //     }
            // );

            res.redirect('/user/portfolio');
        });

    };
    insertObject();
});

router.get('/logout', isLoggedIn, function(req, res, next){
    req.logout();  //method added by passport
    res.redirect('/');
});


router.use('/', notLoggedIn, function(req, res, next){
    next();
});
//notLoggedIn is checked first and so placed in front of all the routes where we allow them to see the route if they are not logged in.
router.get('/signup', function(req, res, next){
    var messages = req.flash('error');
    res.render('user/signup', {messages: messages, hasErrors: messages.length>0});
});

router.get('/vendor_signup', function(req, res, next){
    var messages = req.flash('error');
    res.render('user/vendor_signup', {messages: messages, hasErrors: messages.length>0});
});

router.get('/forgot', function(req, res) {
    res.render('user/forgot', {
        user: req.user
    });
});

router.post('/signup', passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
    failureFlash: true
}), function(req, res, next){ //if success then continue to this third function
    if(req.session.oldUrl){
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);

    } else {
        res.redirect('/user/about'); //deals with case of user not coming from checkout - so just signs in and
        // and gets directed to user profile page
    }
});

router.post('/vendor_signup', passport.authenticate('local.vendor_signup', {
    failureRedirect: '/user/vendor_signup',
    failureFlash: true
}), function(req, res, next){ //if success then continue to this third function
    if(req.session.oldUrl){
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);

    } else {
        res.redirect('/user/about'); //deals with case of user not coming from checkout - so just signs in and
        // and gets directed to user profile page
    }
});

router.get('/signin', function(req, res, next){
    var messages = req.flash('error');
    res.render('user/signin', {messages: messages, hasErrors: messages.length>0});
});

router.post('/signin', passport.authenticate('local.signin', {
    failureRedirect: '/user/signin',
    failureFlash: true
    //Code below for customer if they go to checkout but are not logged in - they are redirected to user/signin
    // but after signin they go back to the checkout (so need old url)
}), function(req, res, next){ //if success then continue to this third function
    if(req.session.oldUrl){
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);

    } else {
        res.redirect('/user/about'); //deals with case of user not coming from checkout - so just signs in and
        // and gets directed to user profile page
    }
});

router.post('/forgot', function(req, res, next) {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            User.findOne({ email: req.body.email }, function(err, user) {
                if (!user) {
                    req.flash('error', 'No account with that email address exists.');
                    return res.redirect('/forgot');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function(err) {
                    done(err, token, user);
                });
            });
        },
        function(token, user, done) {
            var smtpTransport = nodemailer.createTransport('SMTP', {
                service: 'SendGrid',
                auth: {
                    user: '!!! YOUR SENDGRID USERNAME !!!',
                    pass: '!!! YOUR SENDGRID PASSWORD !!!'
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'passwordreset@demo.com',
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });
        }
    ], function(err) {
        if (err) return next(err);
        res.redirect('/forgot');
    });
});


module.exports = router;

//middleware so that only authenticated users can reach certain routes
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

//and for the opposite so that only not logged in users can reach certain routes
function notLoggedIn(req, res, next) {
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

