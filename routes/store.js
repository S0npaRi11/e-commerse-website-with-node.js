const express = require('express');
const mongoose = require('mongoose');
const inventory = require('../models/Inventory');

const router = express.Router();


router.get('/apple',(req,res) => {
    inventory.find({class:'mobile',brand: 'apple'}, (err,result) => {
        if(err) console.err(err);
        else res.render('../views/store.ejs',{id: req.id,class: req.class, brand: req.brand, name: req.name,price: req.price,inventories: result});
    });
});


router.get('/samsung',(req,res) => {
    inventory.find({brand: 'samsung'}, (err,result) => {
        if(err) console.err(err);
        else res.render('../views/store.ejs',{id: req.id,class: req.class, brand: req.brand, name: req.name,price: req.price,inventories: result});
    });
});

router.get('/oneplus',(req,res) => {
    inventory.find({brand: 'oneplus'}, (err,result) => {
        if(err) console.err(err);
        else res.render('../views/store.ejs',{id: req.id,class: req.class, brand: req.brand, name: req.name,price: req.price,inventories: result});
    });
});

module.exports = router;