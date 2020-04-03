if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
//const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const users = require('../models/User');
const initializePassport = require('./passport-config');
const methodOverride = require('method-override');

const app = express();
// app.use(passport.initialize());


//all middleware here

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.session());
app.use(methodOverride('_method'));




const router = express.Router();
//connect to the database


// initalize passport




router.get('/login', (req,res) => {
    res.render('../views/login.ejs');
});


// router.post('/login',passport.authenticate('local',{
//     successRedirect: '/',
//     failureRedirect: '/login',
//     //failureFlash: true,
// }));


router.post('/login', (req,res) => {

    // mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true, useUnifiedTopology: true});

    // const db = mongoose.connection

    // db.on('error', error => console.error(error));
    // db.once('open', () => console.log('connected to the user database'));



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

    req.session.name = req.body.name;
});


router.get('/dashboard', (req, res) => res.render('../views/dashboard.ejs',{ name: req.session.name, email: req.session.email, pno: req.session.pno, address: req.session.address }));

router.get('/wishlist', (req, res) => res.render('../views/wishlist.ejs'));

router.get('/orders', (req, res) => res.render('../views/previous.ejs'));

app.delete('/logout',(req,res) => {
    req.logOut();
    res.redirect('/login');
});


module.exports = router;

module.exports = router;