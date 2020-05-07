const express = require('express');
const users = require('../models/User');
const bcrypt = require('bcrypt');
const inventories = require('../models/Inventory');
const updatePass = require('../models/UpdatePass');

const router = express.Router();

router.get('/updatepass', (req, res) => {
   
    // put the password update request in UpdatePass collection

    console.log(req.session.user);
    let updateRequest = new updatePass({
        uName: req.session.user.fname,
        uId: req.session.user._id,
        uEmail: req.session.email,
    });

    // updateRequest.save().then(err => {
    //     if(err){
    //         console.log(err);
    //         res.render('../views/500.ejs');
    //     }else{
    //         //In future, we want to send an email with a unique link to change the password
    //         //for testing, we are directly rendering updatePass

    //         res.render('../views/updatepass.ejs');
    //     }

    updateRequest.save().then(() => {
        
            //In future, we want to send an email with a unique link to change the password
            //for testing, we are directly rendering updatePass

            res.render('../views/updatepass.ejs');
    }).catch((err) => {
        console.log(err);
        res.render('../views/500.ejs');
    }) ;
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
    users.findOneAndUpdate({'email': req.session.email}, {'$set': {'address': req.body.address, 'pin': req.body.pin}}).exec((err) => {
        if(err){
            console.log(err);
            res.render('../views/500.ejs');
        }else{
            console.log('changed');
            res.redirect('/dashboard');
        }
    }); 
});

router.get('/addtowishlist/:id', (req,res) => {

  
    let a =  inventories.findOne({_id: req.params.id}, (err,result) => {
        if(err) {
            console.log(err);
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
                res.status(204).send();
                // res.redirect('/');
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