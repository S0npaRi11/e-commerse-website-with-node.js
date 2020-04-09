const express = require('express');
const users = require('../models/User');
const bcrypt = require('bcrypt');

const router = express.Router();

router.get('/updatepass', (req, res) => {
    console.log(req.session);
    res.render('../views/updatepass.ejs');

});

router.post('/updatepass', (req,res) => {

    const hashedPassword =  bcrypt.hash(req.body.password2, 10);

    users.findOneAndUpdate({'email': req.session.email}, {'$set': {'password': hashedPassword}}).exec((err) => {
        if(err){
            console.log(err);
        }else{
            res.redirect('/dashboard');
        }
    });
    console.log("password changed");
});

router.get('/updateaddress', (req, res) => res.render('../views/updateaddress.ejs'));

router.post('/updateaddress', (req,res) => {
    users.findOneAndUpdate({'email': req.session.email}, {'$set': {'address': req.body.address, 'pin': req.body.pin}}).exec((err) => {
        if(err){
            console.log(err);
        }else{
            console.log('changed');
            res.redirect('/dashboard');
        }
    }); 
});

// router.get('/orders', (req, res) => res.render('../views/previous.ejs'));

module.exports = router;