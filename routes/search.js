const express = require('express');
const inventory = require('../models/Inventory');

const router = express.Router();

router.get('/', (req,res) => {
    res.render('../views/search.ejs',{searchResults: []})
})

router.post('/', (req,res) => {
    const required = req.body.search.toLowerCase();
    inventory.find({$or:[{class: required}, {brand:required}, {name: required}]}, (err, products) => {
        if(err) console.log(err);
        else{
            res.locals.site.pageTitle = 'Search for ' + required;
            res.render('../views/search.ejs',{searchResults: products})
        }

    });
});



module.exports = router