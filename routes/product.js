const express = require('express');
const inventory = require('../models/Inventory');

const router = express.Router()

router.get('/:id', (req,res) => {
    inventory.findById({_id: req.params.id}, (err,result) => {
        if(err) console.log(err);
        else{
            inventory.find({class: result.class}, (err,recommended) => {
                if(err){
                    console.log(err);
                    res.render('../views/500.ejs');
                }
                else{
                    res.locals.site.pageTitle = recommended.name;
                    res.render('../views/prodDetails.ejs', {class: req.class, brand: req.brand, name: req.name,price: req.price,id: req.id,inventories: result, product: recommended});
                }
            });
        }
    });
});


module.exports = router;