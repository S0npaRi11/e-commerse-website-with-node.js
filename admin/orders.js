const express = require('express');
const orders = require('../models/Orders');
const printReceipt = require('./printReceipt');
const linkedList = require('./linkedList');
const nodeMailer = require('nodemailer');

const router = express.Router();

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth : {
        type: 'Oauth2',
        user: process.env.EMAIL_SEND,  // import from .env
        pass: process.env.EMAIL_PASS,  // import from .env
        clientId: process.env.EMAIL_SENDER_CLIENT_ID,  //import from .env
        clientSecret: process.env.EMAIL_SENDER_CLIENT_SECRET,  // import from .env
        refreshToken: process.env.EMAIL_SENDER_REFERSH_TOKEN,  // import from .env
        accessToken: process.env.EMAIL_SENDER_ACCESS_TOKEN  // import from .env
    }
})

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
                    else {
                        let template = `<p>  Your Product ${result.name} has been packed and will be shipped soon. </p>`;

                        // send an email with the product perchased receipt from here
                        const mailOptions = {
                            from: process.env.EMAIL_SEND,  // sender's email
                            to: req.session.email, // receiver's email
                            subject: 'Order Packed',
                            html:   template// template gose here
                        }

                        transporter.sendMail(mailOptions, err => {
                            if(err) console.log(err);
                            else{
                                res.redirect('/orders/view');
                            }
                        })
                    }
                })
            }else if(result.orderStatus == 'packed'){
                orders.findByIdAndUpdate(req.params.id, {orderStatus: 'shipped'}, err => {
                    if(err) console.log(err);
                    else {
                        let template = `<p>  Your Product ${result.name} has been shipped and will arrive in 3-4 working days. </p>`;

                        // send an email with the product perchased receipt from here
                        const mailOptions = {
                            from: process.env.EMAIL_SEND,  // sender's email
                            to: req.session.email, // receiver's email
                            subject: 'Order Shipped',
                            html:   template// template gose here
                        }

                        transporter.sendMail(mailOptions, err => {
                            if(err) console.log(err);
                            else{
                                res.redirect('/orders/view');
                            }
                        })
                       
                    }
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
            products.forEach(product => {
                printReceipt(product.id)
            });
        }
    });
})

module.exports = router;