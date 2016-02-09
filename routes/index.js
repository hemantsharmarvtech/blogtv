var express = require('express');
var router = express.Router();

var User = require('../models/user');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/register', function (req, res, next) {
    res.render('register', {title: 'Express'});
});

router.post('/register', function (req, res, next) {

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;
    //var birthday = req.body.birthday;
    var gender = req.body.gender;
    var city = req.body.city;
    var state = req.body.state;
    var country = req.body.country;

    var user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        //birthday: birthday,
        gender: gender,
        location: {
            city: city,
            state: state,
            country: country
        }
    });

    user.validate(function (err) {
        if (err) {
            console.log('ERROR: ' + err);
            res.send(err);
        } else {
            console.log(user);

            user.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    console.log(user);
                    res.redirect('/success');
                }
            });
        }
    });


});

router.get('/login', function (req, res, next) {
    res.render('login', {title: 'Express'});
});
router.get('/success', function (req, res, next) {
    res.render('success', {title: 'Express'});
});
router.get('/successlogin', function (req, res, next) {
    res.render('successlogin', {title: 'Express'});
});


router.post('/login', function (req, res, next) {

    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email: email, password: password}, function (err, user) {

        if (err) {
            console.log(err);
            res.redirect('/login');
        }

        console.log(user);
        res.redirect('/successlogin');
        //res.send(JSON.stringify(user));

    });

});


module.exports = router;