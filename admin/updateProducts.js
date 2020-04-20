if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


const express = require('express');
const mongoose = require('mongoose');
const products = require('../models/Inventory');
const multer = require('multer');
const path = require('path');

const router = express.Router();

//connect to the database

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology:true});

const db = mongoose.connection;

db.on('error', error => console.log(error));
db.once('open', () => console.log('connected to the user database'));

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


router.get('/addProducts', (req, res) => {
    res.render('../admin/addProdForm.ejs');
});

router.post('/updateProducts', (req,res) => {
    
    upload(req,res, (err) => {
        if(err) console.log(err);

        console.log(req.body);
        console.log(req.file.path);

        let imgPath = req.file.path.substring(7);
        console.log(imgPath);

        products.findOneAndUpdate({'_id': req.body.id}, {'$set': {"class": req.body.class, "brand": req.body.brand, "name": req.body.name, "price": req.body.price, "stock": req.body.stock, "image": imgPath}}).exec((err) => {
            if(err) console.log(err);
            else res.redirect('/');
        });
    });

    

    // products.findOneAndUpdate({ "_id": req.body.id }, { "$set": { "class": req.body.class, "brand": req.body.brand, "name": req.body.name, "price": req.body.price, "stock": req.body.stock}}).exec(function(err){
    //     if(err) {
    //         console.log(err);
    //     } else {
    //         res.redirect('/')
    //     }
    //  });
});

module.exports = router;