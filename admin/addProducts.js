if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


const express = require('express');
const mongoose = require('mongoose');
const products = require('../models/Inventory');

const router = express.Router();

router.get('/addProducts', (req, res) => {
    res.render('../admin/addProdForm.ejs');
});

router.post('/addProducts', (req,res) => {
    const newProduct = new products({
        class: req.body.class.trim(),
        brand: req.body.brand.trim(),
        name: req.body.name.trim(),
        description: req.body.description.trim(),
        price: req.body.price,
        stock: req.body.stock.trim()
    });

    newProduct.save().then( (err) =>{
        if(err){
            res.render('../admin/addProdForm.ejs');
            console.log(err);
        }else{
           // console.log('saved successfully');
           res.render('../admin/addProdForm.ejs');
           console.log("Product added successfully")
            // db.close();
        }
    });
});

module.exports = router;



