/* -------------------------------------------- 

This file contains all the static routes 

    /
    /about
    /contact
        get
        post
    /terms
    /privacy-policy
    /404
    /500

-----------------------------------------------*/

const express = require('express');
const inventories = require('../models/Inventory');
const messages = require('../models/Messages');
const offers = require('../models/Offers');

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
                    offers.find({}, (err, results) => {
                        if(err){
                            console.log(err);
                            res.render('../views/500.ejs'); 
                        }else{
                            res.locals.site.pageTitle = 'Welcome';
                            res.render('../views/index.ejs',{name: req.name, price: req.price, brand: req.brand, id: req.id, image:req.image, product: a, proRecent: b, popular: popular, offers: results});
                        }
                    })
                }
            })
        }
    });
  
});

// route "/about"
router.get('/about', (req, res) => {
    res.locals.site.pageTitle = 'About Us';
    res.render('../views/about.ejs');
});

// route "/contact"
    // get
    router.get('/contact', (req, res) => {
        res.locals.site.pageTitle = 'Contact Us';
        res.render('../views/contact.ejs')
});

    // post
    router.post('/contact', (req, res) => {
        const message = new messages({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });

        message.save().then(() => {
            res.render('../views/about.ejs', {message:'Thank you for your message!!'});
        }).catch(() => {
            res.render('../views/about.ejs', {error:'Message could not be recorded.'});
        })
    });

// routes "/terms"
router.get('/terms', (req, res) => {
    res.locals.site.pageTitle = 'Terms nad Conditions';
    res.render('../views/terms-and-conditions.ejs')
});

// routes "/privacy-policy"
router.get('/privacy-policy', (req, res) => {
    res.locals.site.pageTitle = 'Privacy Policy';
    res.render('../views/privacy-policy.ejs')
});

// route "/404"
router.get('/404', (req, res) => {
    res.locals.site.pageTitle = '404! Page not found';
    res.render('../views/404.ejs')
});

// route "/500"
router.get('/500', (req, res) => {
    res.locals.site.pageTitle = '500! Connection Error';
    res.render('../views/500.ejs')
});

module.exports = router;