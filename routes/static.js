/* -------------------------------------------- 

This file contains all the static routes 

    /
    /about
    /contact
    /terms
    /privacy-policy
    /404
    /500

-----------------------------------------------*/

const express = require('express');
const inventories = require('../models/Inventory');

const router = express.Router();


// route "/"
router.get('/', (req, res) => {
    // console.log(app.locals.user);
    inventories.find({class: 'mobile'}, (err,result) => {
        if (err){
            console.log(err);
            res.render('../views/500.ejs'); 
        } 
        else{
            const a = result;
            const b = a.sort().reverse();
            inventories.find({class: 'mobile'},null,{sort:{sells: 1}}, (err,popular) => {
                if(err){
                    console.log(err);
                    res.render('../views/500.ejs'); 
                }else{
                    res.render('../views/index.ejs',{name: req.name, price: req.price, brand: req.brand, id: req.id, image:req.image, product: a, proRecent: b, popular: popular});
                }
            })
        }
    });
  
});

// route "/about"
router.get('/about', (req, res) => res.render('../views/about.ejs'));


// route "/contact"
router.get('/contact', (req, res) => res.render('../views/contact.ejs'));

// routes "/terms"
router.get('/terms', (req, res) => res.render('../views/terms-and-conditions.ejs'));

// routes "/privacy-policy"
router.get('/privacy-policy', (req, res) => res.render('../views/privacy-policy.ejs'));

// route "/404"
router.get('/404', (req, res) => res.render('../views/404.ejs'));

// route "/500"
router.get('/500', (req, res) => res.render('../views/500.ejs'));

module.exports = router;