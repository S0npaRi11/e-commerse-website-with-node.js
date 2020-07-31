const express = require('express');
const inventory = require('../models/Inventory');

const router = express.Router();

router.get('/search', (req,res) => {
    res.render('../views/search.ejs',{searchResults: []})
})

router.post('/search', (req,res) => {
    // console.log(req.query.search); 
    // console.log('here')
    const required = req.body.search.toLowerCase();
    // console.log(required);
    inventory.find({$or:[{class: required}, {brand:required}, {name: required}]}, (err, products) => {
        if(err) console.log(err);
        else{
            // console.log(products);
            res.render('../views/search.ejs',{searchResults: products})
        }

    });
});



module.exports = router