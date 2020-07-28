if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


const express = require('express');
const mongoose = require('mongoose');
const products = require('../models/Inventory');
const multer = require('multer')
const path = require('path');

const router = express.Router();

//setting storage engine of the multer

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req,file,cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//init upload

const upload = multer({
    storage: storage,

}).single('image')


router.get('/products', (req, res) => {
    res.render('../admin/addProdForm.ejs');
});

router.post('/products', (req,res) => {

    upload(req,res, (err) => {
        if(err) console.log(err);

        let imgPath = req.file.path.substring(7);

        const newProduct = new products({
            class: req.body.class,
            brand: req.body.brand,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            image: imgPath
        });

        newProduct.save().then( (err) =>{
            if(err){
                res.render('../admin/addProdForm.ejs');
                console.log(err);
            }else{
            // console.log('saved successfully');
            res.render('../admin/addProdForm.ejs');
            console.log("Product added successfully")
                // db.close();
            }
        });
    })
    
});

module.exports = router;



