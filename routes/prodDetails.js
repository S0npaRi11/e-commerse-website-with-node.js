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




router.get('/:id', (req,res) => {
    inventory.findById({_id: req.params.id}, (err,result) => {
        if(err) console.log(err);
        else{
            inventory.find({class: result.class}, (err,recommended) => {
                if(err) console.log(err)
                else{
                    console.log(recommended);
                    res.render('../views/prodDetails.ejs', {class: req.class, brand: req.brand, name: req.name,price: req.price,id: req.id,inventories: result, product: recommended});
                }
            });
            
        }
    });

    // inventories.find({class: 'mobile'}, (err,result) => {
    //     if (err) console.log(err);
    //     else{
    //         const a = result;
    //         // console.log((a).sort().reverse());
    //         const b = a.sort().reverse();
    //         res.render('../views/index.ejs',{name: req.name, price: req.price, brand: req.brand, id: req.id, product: a, proRecent: b});
    //     }
    // });
});


module.exports = router;