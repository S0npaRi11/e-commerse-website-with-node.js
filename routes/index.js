const express = require('express');
const inventories = require('../models/Inventory');

const router = express.Router();

router.get('/', (req, res) => {

    inventories.find({class: 'mobile'}, (err,result) => {
        if (err) console.log(err);
        else{
            const a = result;
            // console.log((a).sort().reverse());
            const b = a.sort().reverse();
            res.render('../views/index.ejs',{name: req.name, price: req.price, brand: req.brand, id: req.id, product: a, proRecent: b});
        }
    });
  
});

module.exports = router;