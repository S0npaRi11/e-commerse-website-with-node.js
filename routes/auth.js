/*--------------------------------------- 

This file contains all the authentication 
realtd routes here

    /login
    /logout
    /register

-----------------------------------------*/

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

// route "/login"

    //get
    router.get('/login', (req,res) => {
        if(req.session.passport != undefined){
            res.render('../views/dashboard.ejs',{error: 'User is already loged in. LogOut from current instance to login as a new user.'})
        }else{
            res.locals.site.pageTitle = 'Log In';
            res.render('../views/login.ejs');
        }
    });

    //post
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
            failureRedirect: '/users/login',
            failureFlash: true
        })(req,res);
    });


// route "logout"
router.post('/logout',(req,res) => {
    if(req.session.passport != undefined){
        req.logOut();
        req.session.destroy((err) =>{
            if(err){
                // console.log(err);
                res.render('../views/500.ejs');
            }
            else{
                res.redirect('/users/login');
            }
        });
    }else{
        res.render('../views/login.ejs',{error: 'You are not logged in. Log in to proceed further.'})
    }
});


// route "register"

    //get
    router.get('/register', (req,res) => {
        res.locals.site.pageTitle = 'Register';
        res.render('../views/register.ejs');
    });

    //post
    router.post('/register', async (req,res) => {

        try{
            const hashedPassword = await bcrypt.hash(req.body.password1, 10);
            const newUser = new users({
                fname: req.body.fname,
                email: req.body.email,
                pno: req.body.pno,
                password: hashedPassword,
                pin: req.body.pin,
                address: req.body.address,
            });
            newUser.save().then( () =>{
                res.render('../views/login.ejs');
            }).catch((err) => {
                // console.log(err);
                res.render('../views/500.ejs');
            });
        }
        catch{
            res.redirect('/users/register');
        }
    });



module.exports = router;