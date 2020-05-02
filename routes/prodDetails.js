if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const inventory = require('../models/Inventory');

const router = express.Router()

router.get('/product/:id', (req,res) => {
    inventory.findById({_id: req.params.id}, (err,result) => {
        if(err) console.log(err);
        else{
            inventory.find({class: result.class}, (err,recommended) => {
                if(err) console.log(err)
                else{
                    console.log(recommended);
                    res.render('../views/prodDetails.ejs', {class: req.class, brand: req.brand, name: req.name,price: req.price,id: req.id,inventories: result, product: recommended});
                }
            });
        }
    });
});


module.exports = router;