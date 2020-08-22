if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const inventory = require('../models/Inventory');

const router = express.Router();

router.get('/delete/:id', (req,res) => {
    inventory.findByIdAndDelete({_id: req.params.id },function(err) {
        if (err) return console.log(err);
        else{
            res.redirect('/');
            console.log("deleted one record")
        }
   });
});

module.exports = router;