if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}



const express = require('express');
const mongoose = require('mongoose');
const inventory = require('../models/Inventory');



const router = express.Router();

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology:true});

const db = mongoose.connection;

db.on('error', error => console.log(error));
db.once('open', () => console.log('connected to the user database'));



router.get('/', (req, res) => {
    inventory.find({}, (err,result) => {
        if(err) console.err(err);
        else res.render('../admin/viewProd.ejs', {class: req.class, brand: req.brand, name: req.name,price: req.price,id: req.id,inventories: result});
    });
   
});



// router.get('/:id', (req, res) => {
//     inventory.findById({id: req.params.id}, (err,result) => {
//         if(err) console.log(err);
//         else res.render('../admin/updateProd.ejs', {class: req.class, brand: req.brand, name: req.name,price: req.price,id: req.id,description: req.description,stock: req.stock, product: result});
//     });
   
// });

// router.get('/list',(req,res) => {
//      inventory.find({}, (err,result) => {
//         if(err) console.err(err);
//         else res.send(result);
//     });
//     // res.send(JSON.parse(products));
// });

module.exports = router;