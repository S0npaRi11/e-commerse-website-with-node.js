if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const users = require('../models/User');
const initializePassport = require('./passport-config');
const methodOverride = require('method-override');

const app = express();
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
});


const router = express.Router();

router.get('/login', (req,res) => {
    res.render('../views/login.ejs');
});


router.post('/login', (req,res) => {

    initializePassport(
        passport,
        email => users.find({email: email}, (error, user) => {
            if(error){
                console.error(error);
            }else{
               console.log('user');
                return user;
            }
        }),
        id => users.find({id: id},(error,user) =>{
            if(error){
                console.error(error);
            }else{
                console.log('user');
                return user;
            }
        })
    );

    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/login'
    })(req,res);


    // console.log("ltrjvyiru "+req.body.email);

    req.session.email = req.body.email;
});


router.get('/dashboard', (req, res) => {
    // console.log(req.user);
    // console.log(req.body);
    console.log(req.session.email);
    users.findOne({email: req.session.email}, (error,user) => {
        if(error){
            console.log(error);
        }else{
            console.log(user);
            // req.session.id = user.id;
            // req.session.fname = user.fname;
            // req.session.phone = user.pno;
            // req.session.pin = user.pin;
            // req.session.address = user.address;
            // req.session.age = user.age;
            // req.session.pass = user.password;
            req.session.user = user;

            res.locals.user = req.session.user;
            console.log(req.session);
            console.log(res.locals.user.fname);
            res.render('../views/dashboard.ejs',{name: res.locals.user.fname, email: res.locals.user.email,pno: res.locals.user.pno, address: res.locals.user.address, pin: res.locals.user.pin});
        }
    });
    //res.locals.user = req.session.user;
    // let val = res.locals.user;
    //console.log("retrytukjhgrfe" + req.session.user);
    
});

router.get('/wishlist', (req, res) => res.render('../views/wishlist.ejs'));

router.get('/orders', (req, res) => res.render('../views/previous.ejs'));

app.delete('/logout',(req,res) => {
    req.logOut();
    res.redirect('/login');
});

module.exports = router;