/*-----------------------------------------

This file contains all the dashboard related 
routes

    /dashboard
    /dashboard/wishlist
    /dashboard/orders
    /dashboard/update
        /pass
        /address
    /dashboard/wishlist/add/:id
    /dashboard/wishlist/remove/:id

-------------------------------------------*/

const express = require('express');
const users = require('../models/User');
const bcrypt = require('bcrypt');
const inventories = require('../models/Inventory');
const updatePass = require('../models/UpdatePass');
const email = require('./emailConfig');
const orders = require('../models/Orders');


const router = express.Router();

// route "/dashboard"
router.get('/',(req, res) => {
    if(req.session.passport.user !== undefined){
        users.findById(req.session.passport.user, (error,user) => {
            if(error){
                // console.log(error);
                res.render('../views/500.ejs');
            }else{
                res.render('../views/dashboard.ejs',{name: user.fname, email: user.email,pno: user.pno, address: user.address, pin: user.pin,initial: user.fname[0],wishlist: user.wishlist, previousBuys: user.orders});
            }
        });
    }else{
        res.render('../views/login.ejs',{error: 'You are not logged in. Log in to proceed further.'})
    }
});

// route "/dashboard/wishlist"
router.get('/wishlist', (req, res) => {
    if(req.session.passport != undefined){
        users.findById(req.session.passport.user, (err,user) => {
            if(err){
                // console.log(err);
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

// route "/dashboard/orders"
router.get('/orders', (req, res) => {
    if(req.session.passport != undefined){
        orders.findById(req.session.passport.user, (err,user) => {
            if(err){
                // console.log(err);
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

// dashboard/update

    // /pass
        //get
        router.get('/update/pass', (req, res) => {
            if(req.session.passport != undefined){
                // put the password update request in UpdatePass collection
                let updateRequest = new updatePass({
                    uName: req.session.user.fname,
                    uId: req.session.user._id,
                    uEmail: req.session.email,
                });
        
                updateRequest.save().then(() => {
        
                    // build the template here
                    let template = ``;
        
                    // send an email with the valid link to reset the password from here
                    const mailOptions = {
                        from: process.env.EMAIL_SEND,  // sender's email
                        to: req.session.email, // receiver's email
                        subject: 'Purchase Receipt',
                        html:   template// template gose here
                    }
        
                    email.sendMail(mailOptions, err => {
                        if(err) console.log(err);
                        else{
                            console.log('email sent for password reset')
                        }
                    });
                }).catch((err) => {
                    console.log(err);
                    res.render('../views/500.ejs');
                }) ;
            }else{
                res.render('../views/login.ejs',{message: 'You are not logged in. Log in to proceed further.'})
            }
        });

        //post
        router.post('/update/pass/:id/:time', (req,res) => {
            // here, we will check ofr the upate password request in the collection by id and time and isUsed flag
            // if failed, render 404
            //else change the password and update isUsed flag to true
        
            updatePass.findById(req.params.id, (err, result) => {
                if(err){
                    // console.log(err);
                    res.render('../views/500.ejs');
                }else{
                    if(result.requestTime < req.params.time && result.expireTime > req.params.time && result.isUsed == 'false'){
        
                        updatePass.findOneAndUpdate({_id: result.id},{$set:{isUsed: 'true'}}, err => {
                            if(err){
                                // console.log(err);
                                res.render('../views/500.ejs');
                            }
                        });
        
                        const hashedPassword =  bcrypt.hash(req.body.password2, 10);
        
                        users.findByIdAndUpdate(req.session.passport.user, {'$set': {'password': hashedPassword}}).exec((err) => {
                            if(err){
                                // console.log(err);
                                res.render('../views/500.ejs');
                            }else{
                                res.redirect('/dashboard');
                            }
                        });
                    }
                }
            });
        });
    
    // /address

        //get
        router.get('/update/address', (req, res) => res.render('../views/updateaddress.ejs'));

        //post
        router.post('/update/address', (req,res) => {
            if(req.session.passport != undefined){
                users.findByIdAndUpdate(req.session.passport.user, {'$set': {'address': req.body.address, 'pin': req.body.pin}}).exec((err) => {
                    if(err){
                        console.log(err);
                        res.render('../views/500.ejs');
                    }else{
                        res.redirect('/dashboard');
                    }
                }); 
            }else{
                res.render('../views/login.ejs',{message: 'You are not logged in. Log in to proceed further.'})
            }
        });


// route "/dashboard/wishlist/add/:id"

router.get('/wishlist/add/:id', (req,res) => {

    if(req.session.passport != undefined){
        let a;  
        inventories.findOne({_id: req.params.id}, (err,result) => {
            if(err) {
                res.render('../views/500.ejs');
            }
            else{
            a = result;
            users.findByIdAndUpdate(req.session.passport.user, {'$push': {'wishlist': {'product_id': a._id, 'class': a.class, 'brand': a.brand, 'name': a.name, 'price': a.price, 'image': a.image}}}).exec((err) => {
                if(err) {
                    console.log(err);
                    res.render('../views/500.ejs');
                }
                else{
                    res.status(204).send().end();
                }
            });
            }
        });
    }else{
        res.render('../views/login.ejs',{message: 'You are not logged in. Log in to proceed further.'})
    }
});

// route "/dashboard/wishlist/remove/:id"
router.get('/wishlist/remove/:id', (req,res) => {
    if(req.session.passport != undefined){
        inventories.findOne({_id: req.params.id}, (err,result) => {
            if(err) {
                console.log(err);
                res.render('../views/500.ejs');
            }else{
                let a = result;
                users.findByIdAndUpdate(req.session.passport.user, {'$pull': {'wishlist': {'product_id': a._id, 'class': a.class, 'brand': a.brand, 'name': a.name, 'price': a.price}}}).exec((err) => {
                    if(err) console.log(err);
                    else{
                        res.redirect('/wishlist');
                    }
                });
            }
        });
    }else{
        res.render('../views/login.ejs',{message: 'You are not logged in. Log in to proceed further.'})
    }
})

module.exports = router;
