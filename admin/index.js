if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const inventory = require('../models/Inventory');

const router = express.Router();

router.get('/', (req, res) => {
   const a = inventory.find({}, (err,result) => {
        if(err) console.err(err);
        else {
            res.render('../admin/viewProd.ejs', {class: req.class, brand: req.brand, name: req.name,price: req.price,id: req.id,inventories: result});
        }
    });
 
});

router.get('/:id', (req, res) => {
    inventory.findById({_id: req.params.id}, (err,result) => {
        if(err) console.log(err);
        else res.render('../admin/updateProd.ejs', {class: req.class, brand: req.brand, name: req.name,price: req.price,id: req.id,description: req.description,stock: req.stock, product: result});
    });
});


module.exports = router;