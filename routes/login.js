const express = require('express');
const passport = require('passport');
const flash = require('express-flash');
const users = require('../models/User');
const initializePassport = require('./passport-config');
const methodOverride = require('method-override');
const orders = require('../models/Orders');

const app = express();
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

const router = express.Router();

router.get('/login', (req,res) => {
    if(req.session.passport != undefined){
        res.render('../views/dashboard.ejs',{error: 'User is already loged in. LogOut from current instance to login as a new user.'})
    }else{
        res.render('../views/login.ejs');
    }
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
    if(req.session.passport.user !== undefined){
        users.findById(req.session.passport.user, (error,user) => {
            if(error){
                console.log(error);
                res.render('../views/500.ejs');
            }else{
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