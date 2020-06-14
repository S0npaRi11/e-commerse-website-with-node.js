const express = require('express');
const inventory = require('../models/Inventory');

const router = express.Router();

router.get('/search', (req,res) => {
    // console.log(req.query.search); 
    const required = req.query.search.trim();
    console.log(required);
    inventory.find({$or:[{class: required}, {brand:required}, {name: required}]}, (err, product) => {
        if(err) console.log(err);
        else{
            console.log(product);
        }

    });
});



module.exports = router