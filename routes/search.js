const express = require('express');
const mongoose = require('mongoose');
const inventory = require('../models/Inventory');

const router = express.Router();

router.get('/search', (req,res) => {
    console.log(req.body); 
});



module.exports = router