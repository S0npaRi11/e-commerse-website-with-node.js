const express = require('express');
const users = require('../models/User');
const bcrypt = require('bcrypt');
const inventories = require('../models/Inventory');
const updatePass = require('../models/UpdatePass');
const email = require('./emailConfig');

const router = express.Router();

router.get('/updatepass', (req, res) => {
   if(req.session.email){
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

router.post('/updatepass/:id/:time', (req,res) => {

    // here, we will check ofr the upate password request in the collection by id and time and isUsed flag
    // if failed, render 404
    //else change the password and update isUsed flag to true

    updatePass.findById(req.params.id, (err, result) => {
        if(err){
            console.log(err);
            res.render('../views/500.ejs');
        }else{
            if(result.requestTime < req.params.time && result.expireTime > req.params.time && result.isUsed == 'false'){

                updatePass.findOneAndUpdate({_id: result.id},{$set:{isUsed: 'true'}}, err => {
                    if(err){
                        console.log(err);
                        res.render('../views/500.ejs');
                    }
                });

                const hashedPassword =  bcrypt.hash(req.body.password2, 10);

                users.findOneAndUpdate({'email': req.session.email}, {'$set': {'password': hashedPassword}}).exec((err) => {
                    if(err){
                        console.log(err);
                        res.render('../views/500.ejs');
                    }else{
                        res.redirect('/dashboard');
                    }
                });
                console.log("password changed");
            }
        }
    });

   
});

router.get('/updateaddress', (req, res) => res.render('../views/updateaddress.ejs'));

router.post('/updateaddress', (req,res) => {
    if(req.session.email){
        users.findOneAndUpdate({'email': req.session.email}, {'$set': {'address': req.body.address, 'pin': req.body.pin}}).exec((err) => {
            if(err){
                console.log(err);
                res.render('../views/500.ejs');
            }else{
                // console.log('changed');
                res.redirect('/dashboard');
            }
        }); 
    }else{
        res.render('../views/login.ejs',{message: 'You are not logged in. Log in to proceed further.'})
    }
});

router.get('/addtowishlist/:id', (req,res) => {

    if(req.session.email){
        let a =  inventories.findOne({_id: req.params.id}, (err,result) => {
            if(err) {
                // console.log(err);
                res.render('../views/500.ejs');
            }
            else{
            a = result;
            users.findOneAndUpdate({'email': req.session.email}, {'$push': {'wishlist': {'product_id': a._id, 'class': a.class, 'brand': a.brand, 'name': a.name, 'price': a.price}}}).exec((err) => {
                if(err) {
                    console.log(err);
                    res.render('../views/500.ejs');
                }
                else{
                    res.status(204).send().end();
                    // res.redirect('/');
                }
            });
            }
        });
    }else{
        res.render('../views/login.ejs',{message: 'You are not logged in. Log in to proceed further.'})
    }
});

router.get('/removefromwishlist/:id', (req,res) => {
    if(req.session.email){
        inventories.findOne({_id: req.params.id}, (err,result) => {
            if(err) {
                console.log(err);
                res.render('../views/500.ejs');
            }else{
                let a = result;
                users.findOneAndUpdate({'email': req.session.email}, {'$pull': {'wishlist': {'product_id': a._id, 'class': a.class, 'brand': a.brand, 'name': a.name, 'price': a.price}}}).exec((err) => {
                    if(err) console.log(err);
                    else{
                        // console.log('removed from wishlist');
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