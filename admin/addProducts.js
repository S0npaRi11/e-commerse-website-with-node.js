if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


const express = require('express');
const mongoose = require('mongoose');
const products = require('../models/Inventory');

const router = express.Router();

//connect to the database

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology:true});

const db = mongoose.connection;

db.on('error', error => console.log(error));
db.once('open', () => console.log('connected to the user database'));




router.get('/addProducts', (req, res) => {
    res.render('../admin/addProdForm.ejs');
});

router.post('/addProducts', (req,res) => {
    const newProduct = new products({
        class: req.body.class,
        brand: req.body.brand,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock
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



