if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const products = require('../models/Inventory');
const multer = require('multer');
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

router.get('/addProducts', (req, res) => {
    res.render('../admin/addProdForm.ejs');
});

router.post('/updateProducts', (req,res) => {
    upload(req,res, (err) => {
        if(err) console.log(err);
        let imgPath = req.file.path.substring(7);
        console.log(imgPath);

        products.findOneAndUpdate({'_id': req.body.id}, {'$set': {"class": req.body.class, "brand": req.body.brand, "name": req.body.name, "price": req.body.price, "stock": req.body.stock, "image": imgPath}}).exec((err) => {
            if(err) console.log(err);
            else res.redirect('/');
        });
    });
});

module.exports = router;