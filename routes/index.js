const express = require('express');
const inventories = require('../models/Inventory');

const router = express.Router();

router.get('/', (req, res) => {

    inventories.find({class: 'mobile'}, (err,result) => {
        if (err){
            console.log(err);
            res.render('../views/500.ejs'); 
        } 
        else{
            const a = result;
            const b = a.sort().reverse();
            // const c = a.sells.sort();
            // console.log(c);
            inventories.find({class: 'mobile'},null,{sort:{sells: 1}}, (err,popular) => {
                if(err){
                    console.log(err);
                    res.render('../views/500.ejs'); 
                }else{
                    res.render('../views/index.ejs',{name: req.name, price: req.price, brand: req.brand, id: req.id, image:req.image, product: a, proRecent: b, popular: popular});
                }
            })
            
        }
    });
  
});

module.exports = router;