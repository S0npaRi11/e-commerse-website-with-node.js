const express = require('express');
const inventory = require('../models/Inventory');

const router = express.Router();

// main store route
router.get('/',(req,res) => {
    inventory.find({}, (err,result) => {
        if(err) {
            console.log(err);
            res.render('../views/500.ejs');
        }
        else{
            const a = result;
            const b = a.sort().reverse();
            res.render('../views/store.ejs',{name: req.name, price: req.price, brand: req.brand, id: req.id, image:req.image, product: a, proRecent: b});
        }
    });
});

// catagory wise display
router.get('/mobiles', (req,res) => {
    inventory.find({class: 'mobile'}, (err,result) => {
        if(err){
            console.log(err);
            res.render('../views/500.ejs');
        }
        else{
            const a = result;
            const b = a.sort().reverse();
            res.render('../views/store.ejs',{name: req.name, price: req.price, brand: req.brand, id: req.id, image:req.image, product: a, proRecent: b});
        }
    });
});

router.get('/laptops', (req,res) => {
    inventory.find({class: 'laptop'}, (err,result) => {
        if(err){
            console.log(err);
            res.render('../views/500.ejs');
        }
        else{
            const a = result;
            const b = a.sort().reverse();
            res.render('../views/store.ejs',{name: req.name, price: req.price, brand: req.brand, id: req.id, image:req.image, product: a, proRecent: b});
        }
    });
});

router.get('/dslrs', (req,res) => {
    inventory.find({class: 'dslr'}, (err,result) => {
        if(err){
            console.log(err);
            res.render('../views/500.ejs');
        }
        else{
            const a = result;
            const b = a.sort().reverse();
            res.render('../views/store.ejs',{name: req.name, price: req.price, brand: req.brand, id: req.id, image:req.image, product: a, proRecent: b});
        }
    });
});

// catagory and brand wise display

//dslrs
router.get('/dslrs/cannon', (req,res) => {
    inventory.find({class: 'dslr', brand:'  cannon '}, (err,result) => {
        if(err) {
            console.log(err);
            res.render('../views/500.ejs');
        }
        else res.render('../views/storeCatagory.ejs', {id: req.id,class: req.class, brand: req.brand, name: req.name,price: req.price,inventories: result});
    });
});

//laptops

router.get('/laptops/apple', (req,res) => {
    inventory.find({class: 'laptop',brand:'  apple '}, (err,result) => {
        if(err) {
            console.log(err);
            res.render('../views/500.ejs');
        }
        else res.render('../views/storeCatagory.ejs', {id: req.id,class: req.class, brand: req.brand, name: req.name,price: req.price,inventories: result});
    });
});

router.get('/laptops/hp', (req,res) => {
    inventory.find({class: 'laptop',brand:'  hp '}, (err,result) => {
        if(err) {
            console.log(err);
            res.render('../views/500.ejs');
        }
        else res.render('../views/storeCatagory.ejs', {id: req.id,class: req.class, brand: req.brand, name: req.name,price: req.price,inventories: result});
    });
});

router.get('/laptops/dell', (req,res) => {
    inventory.find({class: 'laptop', brand:'  dell '}, (err,result) => {
        if(err) {
            console.log(err);
            res.render('../views/500.ejs');
        }
        else res.render('../views/storeCatagory.ejs', {id: req.id,class: req.class, brand: req.brand, name: req.name,price: req.price,inventories: result});
    });
});

router.get('/laptops/apple', (req,res) => {
    inventory.find({class: 'laptop', brand:'  lenovo '}, (err,result) => {
        if(err) {
            console.log(err);
            res.render('../views/500.ejs');
        }
        else res.render('../views/storeCatagory.ejs', {id: req.id,class: req.class, brand: req.brand, name: req.name,price: req.price,inventories: result});
    });
});

//mobiles

router.get('/mobiles/apple', (req,res) => {
    inventory.find({class: 'mobile', brand:'  apple '}, (err,result) => {
        if(err) {
            console.log(err);
            res.render('../views/500.ejs');
        }
        else res.render('../views/storeCatagory.ejs', {id: req.id,class: req.class, brand: req.brand, name: req.name,price: req.price,inventories: result});
    });
});

router.get('/mobiles/oneplus', (req,res) => {
    inventory.find({class: 'mobile', brand:'  oneplus '}, (err,result) => {
        if(err) {
            console.log(err);
            res.render('../views/500.ejs');
        }
        else res.render('../views/storeCatagory.ejs', {id: req.id,class: req.class, brand: req.brand, name: req.name,price: req.price,inventories: result});
    });
});

router.get('/mobiles/samsung', (req,res) => {
    inventory.find({class: 'mobile', brand:'  samsung '}, (err,result) => {
        if(err) {
            console.log(err);
            res.render('../views/500.ejs');
        }
        else res.render('../views/storeCatagory.ejs', {id: req.id,class: req.class, brand: req.brand, name: req.name,price: req.price,inventories: result});
    });
});

module.exports = router;