if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const users = require('../models/User');
const initializePassport = require('./passport-config');
const methodOverride = require('method-override');
const orders = require('../models/Orders');

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
                return user;
            }
        }),
        id => users.find({id: id},(error,user) =>{
            if(error){
                console.error(error);
            }else{
                return user;
            }
        }), req
    );

    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })(req,res);
    req.session.email = req.body.email;
});


router.get('/dashboard', (req, res) => {
    // console.log(req.session.email);
    if(req.session.email){
        users.findOne({email: req.session.email}, (error,user) => {
            if(error){
                console.log(error);
                res.render('../views/500.ejs');
            }else{
                req.session.user = user;

                res.locals.user = req.session.user;
                res.render('../views/dashboard.ejs',{name: req.session.fname, email: req.session.email,pno: req.session.pno, address: req.session.address, pin: req.session.pin});
            }
        });
    }else{
        res.render('../views/login.ejs',{message: 'You are not logged in. Log in to proceed further.'})
    }
});

router.get('/wishlist', (req, res) => {
    if(req.session.email){
        users.findOne({email: req.session.email}, (err,user) => {
            if(err){
                console.log(err);
                res.render('../views/500.ejs');
            } 
            else{
                res.render('../views/wishlist.ejs',{wishlist: req.wishlist, user: user});
            }
        });
    }else{
        res.render('../views/login.ejs',{message: 'You are not logged in. Log in to proceed further.'})
    }
});

router.get('/orders', (req, res) => {
    if(req.session.email){
        orders.find({userEmail: req.session.email}, (err,user) => {
            if(err){
                console.log(err);
                res.render('../views/500.ejs');
            }
            else{
                res.render('../views/previous.ejs',{orders: user});
            }
        });
    }else{
        res.render('../views/login.ejs',{message: 'You are not logged in. Log in to proceed further.'})
    }
});

router.post('/logout',(req,res) => {
    if(req.session.email){
        req.logOut();
        req.session.destroy((err) =>{
            if(err){
                console.log(err);
                res.render('../views/500.ejs');
            }
            else{
                console.log("logout complete");
                res.redirect('/login');
            }
        });
    }else{
        res.render('../views/login.ejs',{message: 'You are not logged in. Log in to proceed further.'})
    }
});

module.exports = router;