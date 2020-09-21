const express = require('express');
const razorpay = require('razorpay');
const inventory = require('../models/Inventory');
const crypto = require('crypto');
const user  = require('../models/User');
const order = require('../models/Orders');
const email = require('./emailConfig');
// const e = require('express');

const router = express.Router();

router.get('/:id', (req,res) => {
    if(req.session.passport !== undefined){
        // creating an istance
        const instance = new razorpay({
            key_id: process.env.RAZORPAY_ID,
            key_secret: process.env.RAZORPAY_SECRET
        });

        const options = {};
        inventory.findById(req.params.id, (err,product) => {
            if(err) console.log(err);
            else{
                options.amount = product.price * 100; 
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
    }else{
        res.render('../views/login.ejs',{message: 'You are not logged in. Log in to proceed further.'});
    }
});

router.post('/success/:id', (req,res)=> {
    // console.log(req.body);
    let generatedSignature = crypto
        .createHmac(
            "SHA256",
            process.env.RAZORPAY_SECRET
        ).update(req.body.razorpay_order_id + '|' + req.body.razorpay_payment_id)
        .digest('hex');
    let isSignatureValid = generatedSignature == req.body.razorpay_signature;

    if(isSignatureValid){
       // if successfull, save the purchase to the orders collection
       inventory.findById(req.params.id, (err, product) => {

        const purchasedItem = {
            id: product.id,
            class: product.class,
            brand: product.brand,
            price: product.price,
            name: product.name
        }

            const newOeder = new order({
                // productId: product.id,
                // productClass: product.class,
                // productBrand: product.brand,
                // productPrice: product.price,
                // productName: product.name,
                products: purchasedItem,
                userId: req.session.user.id,
                userEmail: req.session.email,
                userName: req.session.user.fname,
                userAddress: req.session.user.address,
                razorpayOrderId: req.body.razorpay_order_id,
                razorpayPaymentId: req.body.razorpay_payment_id
            });

            newOeder.save().then( () => {
                user.findOne({email:req.session.email}, {$set:{orders:{class: product.class, brand: product.brand, price: product.price, orderID: req.body.razorpay_order_id, paymentID: req.body.razorpay_payment_id}}}, err => {
                    if(err) console.log(err);
                    else{

                        // build the template here
                        let template = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

                        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
                        <head>
                        <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
                        <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
                        <meta content="width=device-width" name="viewport"/>
                        <!--[if !mso]><!-->
                        <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
                        <!--<![endif]-->
                        <title></title>
                        <!--[if !mso]><!-->
                        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"/>
                        <!--<![endif]-->
                        <style type="text/css">
                                body {
                                    margin: 0;
                                    padding: 0;
                                }
                        
                                table,
                                td,
                                tr {
                                    vertical-align: top;
                                    border-collapse: collapse;
                                }
                        
                                * {
                                    line-height: inherit;
                                }
                        
                                a[x-apple-data-detectors=true] {
                                    color: inherit !important;
                                    text-decoration: none !important;
                                }
                            </style>
                        <style id="media-query" type="text/css">
                                @media (max-width: 520px) {
                        
                                    .block-grid,
                                    .col {
                                        min-width: 320px !important;
                                        max-width: 100% !important;
                                        display: block !important;
                                    }
                        
                                    .block-grid {
                                        width: 100% !important;
                                    }
                        
                                    .col {
                                        width: 100% !important;
                                    }
                        
                                    .col>div {
                                        margin: 0 auto;
                                    }
                        
                                    img.fullwidth,
                                    img.fullwidthOnMobile {
                                        max-width: 100% !important;
                                    }
                        
                                    .no-stack .col {
                                        min-width: 0 !important;
                                        display: table-cell !important;
                                    }
                        
                                    .no-stack.two-up .col {
                                        width: 50% !important;
                                    }
                        
                                    .no-stack .col.num4 {
                                        width: 33% !important;
                                    }
                        
                                    .no-stack .col.num8 {
                                        width: 66% !important;
                                    }
                        
                                    .no-stack .col.num4 {
                                        width: 33% !important;
                                    }
                        
                                    .no-stack .col.num3 {
                                        width: 25% !important;
                                    }
                        
                                    .no-stack .col.num6 {
                                        width: 50% !important;
                                    }
                        
                                    .no-stack .col.num9 {
                                        width: 75% !important;
                                    }
                        
                                    .video-block {
                                        max-width: none !important;
                                    }
                        
                                    .mobile_hide {
                                        min-height: 0px;
                                        max-height: 0px;
                                        max-width: 0px;
                                        display: none;
                                        overflow: hidden;
                                        font-size: 0px;
                                    }
                        
                                    .desktop_hide {
                                        display: block !important;
                                        max-height: none !important;
                                    }
                                }
                            </style>
                        </head>
                        <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;">
                        <!--[if IE]><div class="ie-browser"><![endif]-->
                        <table bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;" valign="top" width="100%">
                        <tbody>
                        <tr style="vertical-align: top;" valign="top">
                        <td style="word-break: break-word; vertical-align: top;" valign="top">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#FFFFFF"><![endif]-->
                        <div style="background-color:transparent;">
                        <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                        <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                        <div class="col num12" style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
                        <div style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                        <!--<![endif]-->
                        <div align="center" class="img-container center fixedwidth" style="padding-right: 30px;padding-left: 30px;">
                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 30px;padding-left: 30px;" align="center"><![endif]-->
                        <div style="font-size:1px;line-height:30px"> </div><a href="mobilebazar.herokuapp.com" style="outline:none" tabindex="-1" target="_blank"> <img align="center" alt="Alternate text" border="0" class="center fixedwidth" src="images/4.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 125px; display: block;" title="Alternate text" width="125"/></a>
                        <div style="font-size:1px;line-height:30px"> </div>
                        <!--[if mso]></td></tr></table><![endif]-->
                        </div>
                        <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                        </div>
                        </div>
                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                        </div>
                        </div>
                        </div>
                        <div style="background-color:transparent;">
                        <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                        <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                        <div class="col num12" style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
                        <div style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                        <!--<![endif]-->
                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                        <div style="color:#555555;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                        <div style="line-height: 1.2; font-size: 12px; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #555555; mso-line-height-alt: 14px;">
                        <p style="font-size: 42px; line-height: 1.2; word-break: break-word; text-align: center; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 50px; margin: 0;"><span style="font-size: 42px; color: #2ac37d;">THANK YOU,</span></p>
                        <p style="font-size: 20px; line-height: 1.2; word-break: break-word; text-align: center; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 20px;">for shopping with us.</span></p>
                        <p style="font-size: 20px; line-height: 1.2; word-break: break-word; text-align: center; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 20px;">Your order has been registered.</span></p>
                        <p style="font-size: 20px; line-height: 1.2; word-break: break-word; text-align: center; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 20px;">Your order will be delivered within 3 to 5 working days.</span></p>
                        <p style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 17px; margin: 0;"> </p>
                        <p style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 17px; margin: 0;"> </p>
                        <p style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 17px; margin: 0;"> </p>
                        <p style="font-size: 30px; line-height: 1.2; word-break: break-word; text-align: center; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 36px; margin: 0;"><span style="color: #2ac37d; font-size: 30px;"><strong>Order Details</strong></span></p>
                        </div>
                        </div>
                        <!--[if mso]></td></tr></table><![endif]-->
                        <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                        </div>
                        </div>
                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                        </div>
                        </div>
                        </div>
                        <div style="background-color:transparent;">
                        <div class="block-grid three-up" style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                        <!--[if (mso)|(IE)]><td align="center" width="166" style="background-color:transparent;width:166px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                        <div class="col num4" style="max-width: 320px; min-width: 166px; display: table-cell; vertical-align: top; width: 166px;">
                        <div style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                        <!--<![endif]-->
                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                        <div style="color:#555555;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                        <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 14px;">
                        <p style="text-align: center; line-height: 1.2; word-break: break-word; font-size: 20px; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 20px; color: #2ac37d;">Order ID</span></p>
                        <p style="text-align: center; line-height: 1.2; word-break: break-word; font-size: 20px; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 20px;"><span style="font-size: 15px;">${product.id}</span></span></p>
                        </div>
                        </div>
                        <!--[if mso]></td></tr></table><![endif]-->
                        <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                        </div>
                        </div>
                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                        <!--[if (mso)|(IE)]></td><td align="center" width="166" style="background-color:transparent;width:166px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                        <div class="col num4" style="max-width: 320px; min-width: 166px; display: table-cell; vertical-align: top; width: 166px;">
                        <div style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                        <!--<![endif]-->
                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                        <div style="color:#555555;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                        <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 14px;">
                        <p style="text-align: center; line-height: 1.2; word-break: break-word; font-size: 20px; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 20px; color: #2ac37d;">Order Contents</span></p>
                        <p style="text-align: center; line-height: 1.2; word-break: break-word; font-size: 15px; mso-line-height-alt: 18px; margin: 0;"><span style="font-size: 15px;">${product.name}
                        </span></p>
                        </div>
                        </div>
                        <!--[if mso]></td></tr></table><![endif]-->
                        <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                        </div>
                        </div>
                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                        <!--[if (mso)|(IE)]></td><td align="center" width="166" style="background-color:transparent;width:166px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                        <div class="col num4" style="max-width: 320px; min-width: 166px; display: table-cell; vertical-align: top; width: 166px;">
                        <div style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                        <!--<![endif]-->
                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                        <div style="color:#555555;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                        <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 14px;">
                        <p style="font-size: 20px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 20px; color: #2ac37d;">Price</span></p>
                        <p style="font-size: 15px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 18px; margin: 0;"><span style="font-size: 15px;">${product.price}
                        </span></p>
                        </div>
                        </div>
                        <!--[if mso]></td></tr></table><![endif]-->
                        <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                        </div>
                        </div>
                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                        </div>
                        </div>
                        </div>
                        <div style="background-color:#454545;">
                        <div class="block-grid mixed-two-up" style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#454545;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                        <!--[if (mso)|(IE)]><td align="center" width="375" style="background-color:transparent;width:375px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;background-color:#454545;"><![endif]-->
                        <div class="col num9" style="display: table-cell; vertical-align: top; min-width: 320px; max-width: 369px; background-color: #454545; width: 375px;">
                        <div style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                        <!--<![endif]-->
                        <div align="left" class="img-container left fixedwidth" style="padding-right: 10px;padding-left: 20px;">
                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 10px;padding-left: 20px;" align="left"><![endif]-->
                        <div style="font-size:1px;line-height:10px"> </div><img alt="Alternate text" border="0" class="left fixedwidth" src="images/5.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 75px; display: block;" title="Alternate text" width="75"/>
                        <div style="font-size:1px;line-height:10px"> </div>
                        <!--[if mso]></td></tr></table><![endif]-->
                        </div>
                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                        <div style="color:#555555;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                        <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 14px;">© <a href="http://www.mobilebazar.herokuapp.com" rel="noopener" style="text-decoration: underline; color: #2ac37d;" target="_blank">mobilebazar.herokuapp.com</a><span style="color: #ffffff;">, All rights reserved.</span></div>
                        </div>
                        <!--[if mso]></td></tr></table><![endif]-->
                        <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                        </div>
                        </div>
                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                        <!--[if (mso)|(IE)]></td><td align="center" width="125" style="background-color:transparent;width:125px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;background-color:#454545;"><![endif]-->
                        <div class="col num3" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 123px; background-color: #454545; width: 125px;">
                        <div style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                        <!--<![endif]-->
                        <table cellpadding="0" cellspacing="0" class="social_icons" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top" width="100%">
                        <tbody>
                        <tr style="vertical-align: top;" valign="top">
                        <td style="word-break: break-word; vertical-align: top; padding-top: 30px; padding-right: 25px; padding-bottom: 25px; padding-left: 25px;" valign="top">
                        <table align="center" cellpadding="0" cellspacing="0" class="social_table" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-tspace: 0; mso-table-rspace: 0; mso-table-bspace: 0; mso-table-lspace: 0;" valign="top">
                        <tbody>
                        <tr align="center" style="vertical-align: top; display: inline-block; text-align: center;" valign="top">
                        <td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 1px; padding-left: 1px;" valign="top"><a href="https://www.facebook.com/" target="_blank"><img alt="Facebook" height="32" src="images/facebook2x.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;" title="Facebook" width="32"/></a></td>
                        <td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 1px; padding-left: 1px;" valign="top"><a href="https://instagram.com/" target="_blank"><img alt="Instagram" height="32" src="images/instagram2x.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;" title="Instagram" width="32"/></a></td>
                        </tr>
                        </tbody>
                        </table>
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                        </div>
                        </div>
                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                        </div>
                        </div>
                        </div>
                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        <!--[if (IE)]></div><![endif]-->
                        </body>
                        </html>`;

                        // send an email with the product perchased receipt from here
                        const mailOptions = {
                            from: process.env.EMAIL_SEND,  // sender's email
                            to: req.session.email, // receiver's email
                            subject: 'Purchase Receipt',
                            html:   template// template gose here
                        }

                        email.sendMail(mailOptions, err => {
                            if(err) console.log(err);
                            else{
                                res.rediect('/product/' + product.id);
                            }
                        })
                    }
                });
            }).catch( (err)=>{
                console.log(err);
                res.render('../views/500.ejs');
            });
       });
    }
});

router.get('/multiple/:items', (req,res) => {
    const purchasedItemsIdArray = req.params.items.slice('*');

    const purchasedItemsArray = [];

    purchasedItemsIdArray.forEach(item => {
        inventory.findById(item, (error, product) => {
            if(error) console.log(error);
            else{

                const productToPush = {
                    id: product.id,
                    class: product.class,
                    brand: product.brand,
                    price: product.price,
                    name: product.name
                }
                purchasedItemsArray.push(productToPush);
            }
        })
    });

    const newOrder = new order({
        products: purchasedItemsAray,
        products: purchasedItem,
        userId: req.session.user.id,
        userEmail: req.session.email,
        userName: req.session.user.fname,
        userAddress: req.session.user.address,
        razorpayOrderId: req.body.razorpay_order_id,
        razorpayPaymentId: req.body.razorpay_payment_id
    })

    newOrder.save.then(() =>{
        res.redirect('/dashboard');
    }).catch(() => {
        res.redirect('/');
    })
});


module.exports = router;