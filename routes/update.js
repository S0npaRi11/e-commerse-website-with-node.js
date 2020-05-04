const express = require('express');
const users = require('../models/User');
const bcrypt = require('bcrypt');
const inventories = require('../models/Inventory');

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

router.get('/addtowishlist/:id', (req,res) => {

  
    let a =  inventories.findOne({_id: req.params.id}, (err,result) => {
        if(err) console.log(err);
        else{
         a = result;
           console.log(result);
           console.log(a.id);
           users.findOneAndUpdate({'email': req.session.email}, {'$push': {'wishlist': {'product_id': a._id, 'class': a.class, 'brand': a.brand, 'name': a.name, 'price': a.price}}}).exec((err) => {
            if(err) console.log(err);
            else{
                res.status(201).send();
                res.redirect('/');
            }
        });
        }
    });
});

router.get('/removefromwishlist/:id', (req,res) => {
    inventories.findOne({_id: req.params.id}, (err,result) => {
        if(err) console.log(err);
        else{
        let a = result;
           users.findOneAndUpdate({'email': req.session.email}, {'$pull': {'wishlist': {'product_id': a._id, 'class': a.class, 'brand': a.brand, 'name': a.name, 'price': a.price}}}).exec((err) => {
            if(err) console.log(err);
            else{
                console.log('removed from wishlist');
                res.redirect('/wishlist');
            }
        });
        }
    });
})

module.exports = router;