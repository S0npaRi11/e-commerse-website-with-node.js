const express = require('express');
const orders = require('../models/Orders');
const printReceipt = require('./printReceipt');
const linkedList = require('./linkedList');

const router = express.Router();

router.get('/view', (req,res) => {
    orders.find({}, (err,result) => {
        if(err) console.log(err);
        else res.render('../admin/orders.ejs',{orders: result});
    });
});

router.get('/update/:id', (req,res) => {
    orders.findById(req.params.id, (err,result) => {
        if(err) console.log(err);
        else{
            if(result.orderStatus == 'ordered'){
                orders.findByIdAndUpdate(req.params.id, {orderStatus: 'packed'}, err => {
                    if(err) console.log(err);
                    else res.redirect('/orders/view');
                })
            }else if(result.orderStatus == 'packed'){
                orders.findByIdAndUpdate(req.params.id, {orderStatus: 'shipped'}, err => {
                    if(err) console.log(err);
                    else res.redirect('/orders/view');
                });
            }else{
                res.redirect('/orders/view');
            }
        }
    });
});

router.get('/print/:id',(req,res) => {
    printReceipt(req.params.id);
});

router.get('/print',(req,res) => {
    orders.find({$and:[{orderStatus:'packed'},{isReceiptPrinted:false}]},(error,products) => {
        if(error) console.log(error);
        else{
            products.forEach = (product) => {
                printReceipt(product.id)
            }
        }
    });
})

module.exports = router;