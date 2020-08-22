const express = require('express');
const offers = require('../models/Offers');
const multer = require('multer')
const path = require('path');

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

const router  = express.Router();

router.get('/', (req,res) => {
    offers.find({}, (error,result) => {
        if(error) console.error(error);
        else{
            res.render('../admin/viewOffers.ejs',{offers: result});
        }
    })
});

router.get('/add', (req,res) => {
    res.render('../admin/createOffers.ejs');
});

router.post('/add', (req,res) => {
    upload(req,res, (err) => {
        if(err) console.log(err);
        else{
            let imgPath = req.file.path.substring(7);
            const newOffer = new offers({
                title: req.body.title,
                description: req.body.description,
                endOn: req.body.endOn,
                link: req.body.title,
                products: req.body.products,
                // stock: req.body.stock,
                image: imgPath
            });

            newOffer.save().then( (err) =>{
                if(err){
                    res.render('../admin/createOffers.ejs');
                }else{
                    res.render('../admin/createOffers.ejs');
                }
            });
        }
    })
    
});

router.get('/update', (req,res) => {
    res.render('./updateOffers.ejs');
});

router.post('/update', (req,res) => {
    upload(req,res, (err) => {
        if(err) console.log(err);
        let imgPath = req.file.path.substring(7);
       
        products.findOneAndUpdate({'_id': req.body.id}, {'$set': {"title": req.body.title, "endOn": req.body.endOn, "products": req.body.products, "description": req.body.description, "image": imgPath}}).exec((err) => {
            if(err) console.log(err);
            else res.redirect('/');
        });
    });
});

router.get('/delete/:id', (req,res) => {
    offers.findByIdAndDelete({_id: req.params.id },function(err) {
        if (err) return console.log(err);
        else{
            res.redirect('/');
            console.log("deleted one record")
        }
   });
});

module.exports = router;

