const express = require('express');
const mongoose = require('mongoose');

const inventory = require('../models/Inventory');


//connect to the database
// mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true, useUnifiedTopology: true});

// const db = mongoose.connection

// db.on('error', error => console.error(error));
// db.once('open', () => console.log('connected to the user database'));


const router = express.Router();



router.get('/search', (req,res) => {
    // inventory.findOne({name: req.query}, (err,result) => {
    //     if(err) console.log(err);
    //     else console.log(req.query);
    // });
    console.log(req.body); 
});



module.exports = router