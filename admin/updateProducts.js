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

router.post('/updateProducts', (req,res) => {
    products.findOneAndUpdate({ "_id": req.body.id }, { "$set": { "class": req.body.class, "brand": req.body.brand, "name": req.body.name, "price": req.body.price, "stock": req.body.stock}}).exec(function(err){
        if(err) {
            console.log(err);
        } else {
            res.redirect('/')
        }
     });
});

module.exports = router;