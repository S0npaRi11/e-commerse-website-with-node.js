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

const router = express.Router();

app.use(function(req, res, next) {
    res.locals.user = req.session.passport.user;
    next();
});

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
        }),
    );

    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })(req,res);
});


router.get('/dashboard',(req, res) => {
    if(req.session.passport != undefined){
        users.findById(req.session.passport.user, (error,user) => {
            if(error){
                console.log(error);
                res.render('../views/500.ejs');
            }else{
                // console.log(user);
                res.render('../views/dashboard.ejs',{name: user.fname, email: user.email,pno: user.pno, address: user.address, pin: user.pin,initial: user.fname[0],wishlist: user.wishlist, previousBuys: user.orders});
            }
        });
    }else{
        res.render('../views/login.ejs',{error: 'You are not logged in. Log in to proceed further.'})
    }
});

router.get('/wishlist', (req, res) => {
    if(req.session.passport != undefined){
        users.findById(req.session.passport.user, (err,user) => {
            if(err){
                console.log(err);
                res.render('../views/500.ejs');
            } 
            else{
                res.render('../views/wishlist.ejs',{user: user});
            }
        });
    }else{
        res.render('../views/login.ejs',{error: 'You are not logged in. Log in to proceed further.'})
    }
});

router.get('/orders', (req, res) => {
    if(req.session.passport != undefined){
        orders.findById(req.session.passport.user, (err,user) => {
            if(err){
                console.log(err);
                res.render('../views/500.ejs');
            }
            else{
                res.render('../views/previous.ejs',{orders: user});
            }
        });
    }else{
        res.render('../views/login.ejs',{error: 'You are not logged in. Log in to proceed further.'})
    }
});

router.post('/logout',(req,res) => {
    if(req.session.passport != undefined){
        req.logOut();
        req.session.destroy((err) =>{
            if(err){
                console.log(err);
                res.render('../views/500.ejs');
            }
            else{
                res.redirect('/login');
            }
        });
    }else{
        res.render('../views/login.ejs',{error: 'You are not logged in. Log in to proceed further.'})
    }
});

module.exports = router;