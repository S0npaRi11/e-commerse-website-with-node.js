if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}



const express = require('express');
const mongoose = require('mongoose');
const inventory = require('../models/Inventory');


const router = express.Router()


// connect to db


// mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology:true});

// const db = mongoose.connection;

// db.on('error', error => console.log(error));
// db.once('open', () => console.log('connected to the user database'));




router.get('/store/:id', (req,res) => {
    inventory.findById({_id: req.params.id}, (err,result) => {
        if(err) console.log(err);
        else{
            res.render('../views/prodDetails.ejs', {class: req.class, brand: req.brand, name: req.name,price: req.price,id: req.id,inventories: result});
        }
    });
});


module.exports = router;