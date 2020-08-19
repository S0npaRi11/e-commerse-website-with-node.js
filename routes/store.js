/*-------------------------------------------------- 

This file contains all the store related routes

    /store
    /store/:class
    /store/:class/:brand
    /store/:id


----------------------------------------------------*/

const express = require('express');
const inventory = require('../models/Inventory');

const router = express.Router();

// route "/store"
router.get('/',(req,res) => {
    inventory.find({}, (err,result) => {
        if(err) {
            // console.log(err);
            res.render('../views/500.ejs');
        }

        const a = result;
        const b = a.sort().reverse();
        inventory.find({class: 'mobile'},null,{sort:{sells: 1}}, (err,popular) => {
            if(err){
                // console.log(err);
                res.render('../views/500.ejs'); 
            }else{
                res.render('../views/index.ejs',{name: req.name, price: req.price, brand: req.brand, id: req.id, image:req.image, product: a, proRecent: b, popular: popular});
            }
        })
    });
});

// route "/store/:class"
router.get('/:class', (req,res) => {
    inventory.find({class: req.params.class}, (err,result) => {
        if(err){
            // console.log(err);
            res.render('../views/500.ejs');
        }

        const a = result;
        const b = a.sort().reverse();
        inventory.find({class: 'mobile'},null,{sort:{sells: 1}}, (err,popular) => {
            if(err){
                // console.log(err);
                res.render('../views/500.ejs'); 
            }else{
                res.render('../views/store.ejs',{name: req.name, price: req.price, brand: req.brand, id: req.id, image:req.image, product: a, proRecent: b, popular: popular});
            }
        })
    });
});

// route "/store/:class/:brand"
router.get('/:class/:brand', (req,res) => {
    inventory.find({$and:[{class: req.params.class, brand: req.params.brand}]}, (err,result) => {
        if(err) {
            // console.log(err);
            res.render('../views/500.ejs');
        }
        else res.render('../views/storeCatagory.ejs', {id: req.id,class: req.class, brand: req.brand, name: req.name,price: req.price,inventories: result, product: req.params.class, brand: req.params.brand});
    });
});


// route "/store/:id"
// router.get('/:class/:brand/:id', (req,res) => {
//     inventory.findById({_id: req.params.id}, (err,result) => {
//         if(err) {
//             // console.log(err);
//             res.render('../views/500.ejs');
//         }
//         else{
//             inventory.find({class: result.class}, (err,recommended) => {
//                 if(err){
//                     // console.log(err);
//                     res.render('../views/500.ejs');
//                 }
//                 else{
//                     res.render('../views/prodDetails.ejs', {class: req.class, brand: req.brand, name: req.name,price: req.price,id: req.id,inventories: result, product: recommended});
//                 }
//             });
//         }
//     });
// });

module.exports = router;