const express = require('express');
const razorpay = require('razorpay');
const inventory = require('../models/Inventory');
const crypto = require('crypto');
const user  = require('../models/User');
const order = require('../models/Orders');

const router = express.Router();

router.get('/:id', (req,res) => {

    // creating an istance
    const instance = new razorpay({
        key_id: process.env.RAZORPAY_ID,
        key_secret: process.env.RAZORPAY_SECRET
    });

    const options = {};
    inventory.findById(req.params.id, (err,product) => {
        if(err) console.log(err);
        else{
            options.price = product.price * 100; 
            options.currency = 'INR';
        }

        instance.orders.create(options, (err,order) => {
            if(err) {
                console.log(err);
                res.render('../views/500.ejs');
            }
            else{
                console.log(order);
                res.render('../views/checkout.ejs',{orderID: order.id, key: instance.key_id, inventories:product});
            }
        });
    });
});

router.post('/success/:id', (req,res)=> {
    console.log(req.body);
    let generatedSignature = crypto
        .createHmac(
            "SHA256",
            process.env.RAZORPAY_SECRET
        ).update(req.body.razorpay_order_id + '|' + req.body.razorpay_payment_id)
        .digest('hex');
    let isSignatureValid = generatedSignature == req.body.razorpay_signature;

    if(isSignatureValid){
       // if successfull, save the purchase to the user collection
       inventory.findById(req.params.id, (err, product) => {
            newOeder = new order({
                productId: product.id,
                productClass: product.class,
                productBrand: product.brand,
                productPrice: product.price,
                productName: product.name,
                userId: req.session.user.id,
                userEmail: req.session.email,
                userName: req.session.user.fname,
                userAddress: req.session.user.address,
                razorpayOrderId: req.body.razorpay_order_id,
                razorpayPaymentId: req.body.razorpay_payment_id
            });

            order.save().then( () => {
                user.findOne({email:req.session.email}, {$set:{orders:{class: product.class, brand: product.brand, price: product.price, orderID: req.body.razorpay_order_id, paymentID: req.body.razorpay_payment_id}}}, err => {
                    if(err) console.log(err);
                    else{
                        res.rediect('/product/' + product.id);
                    }
                });
            }).catch( (err)=>{
                console.log(err);
                res.render('../views/500.ejs');
            });
       });
    }
});


module.exports = router;