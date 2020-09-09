const express = require('express');
const inventories = require('../models/Inventory');

const router = express.Router();

router.get('/', (req,res) => {
    res.locals.site.pageTitle = 'Cart';
    if(req.session.cart === undefined){
        req.session.cart = [];
    }
    res.render('../views/cart.ejs');
});

router.get('/add/:id', (req,res) => {
    inventories.findById(req.params.id, (error, product) =>{
        if(error){
            console.log(error);
            res.redirect('/500');
        }else{
            if(req.session.cart != undefined){
                req.session.cart.push(product);
            }else{
                req.session.cart =  [];
                req.session.cart.push(product);
            }
            res.status(204).send().end();
        }
    });
});

router.get('/remove/:id', (req,res) => {
    
    // writing a function to delete given elements from an array
    let remove = (array, elementId) => {
        return array.filter((ele) => ele._id != elementId);
    }

    req.session.cart = remove(req.session.cart, req.params.id);

    res.redirect('/cart');
});

module.exports = router;