/*-----------------------------------------

This file contains all the dashboard related 
routes

    /dashboard
    /dashboard/wishlist
    /dashboard/orders
    /dashboard/update
        /pass
        /address
    /dashboard/wishlist/add/:id
    /dashboard/wishlist/remove/:id

-------------------------------------------*/

const express = require('express');
const users = require('../models/User');
const bcrypt = require('bcrypt');
const inventories = require('../models/Inventory');
const updatePass = require('../models/UpdatePass');
const email = require('./emailConfig');
const orders = require('../models/Orders');


const router = express.Router();

// route "/dashboard"
router.get('/',(req, res) => {
    if(req.session.passport.user !== undefined){
        users.findById(req.session.passport.user, (error,user) => {
            if(error){
                // console.log(error);
                res.render('../views/500.ejs');
            }else{
                res.render('../views/dashboard.ejs',{name: user.fname, email: user.email,pno: user.pno, address: user.address, pin: user.pin,initial: user.fname[0],wishlist: user.wishlist, previousBuys: user.orders});
            }
        });
    }else{
        res.render('../views/login.ejs',{error: 'You are not logged in. Log in to proceed further.'})
    }
});

// route "/dashboard/wishlist"
router.get('/wishlist', (req, res) => {
    if(req.session.passport != undefined){
        users.findById(req.session.passport.user, (err,user) => {
            if(err){
                // console.log(err);
                res.render('../views/500.ejs');
            } 
            else{
                res.render('../views/wishlist.ejs',{user: user});
            }
        });
    }else{
        res.render('../views/login.ejs',{error: 'You are not logged in. Log in to proceed further.'})
    }
});

// route "/dashboard/orders"
router.get('/orders', (req, res) => {
    if(req.session.passport != undefined){
        orders.findById(req.session.passport.user, (err,user) => {
            if(err){
                // console.log(err);
                res.render('../views/500.ejs');
            }
            else{
                res.render('../views/previous.ejs',{orders: user});
            }
        });
    }else{
        res.render('../views/login.ejs',{error: 'You are not logged in. Log in to proceed further.'})
    }
});

// dashboard/update

    // /pass
        //get
        router.get('/update/pass', (req, res) => {
            if(req.session.passport != undefined){
                // put the password update request in UpdatePass collection
                let updateRequest = new updatePass({
                    uName: req.session.user.fname,
                    uId: req.session.user._id,
                    uEmail: req.session.email,
                });
        
                updateRequest.save().then(() => {
        
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
                    <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 14px;">
                    <p style="text-align: center; line-height: 1.2; word-break: break-word; font-size: 46px; mso-line-height-alt: 55px; margin: 0;"><span style="font-size: 46px; color: #2ac37d;">User Name,</span></p>
                    <p style="text-align: center; line-height: 1.2; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"> </p>
                    <p style="text-align: center; line-height: 1.2; word-break: break-word; font-size: 20px; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 20px;">You requested for password recovery / change.</span></p>
                    <p style="text-align: center; line-height: 1.2; word-break: break-word; font-size: 20px; mso-line-height-alt: 24px; margin: 0;"><span style="font-size: 20px;">Click the button bellow to recover / change the password.</span></p>
                    <p style="text-align: center; line-height: 1.2; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"> </p>
                    <p style="text-align: center; line-height: 1.2; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"> </p>
                    <p style="text-align: center; line-height: 1.2; word-break: break-word; mso-line-height-alt: 14px; margin: 0;"> </p>
                    </div>
                    </div>
                    <!--[if mso]></td></tr></table><![endif]-->
                    <div align="center" class="button-container" style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:37.5pt; width:182.25pt; v-text-anchor:middle;" arcsize="60%" stroke="false" fillcolor="#2ac37d"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:20px"><![endif]-->
                    <div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#2ac37d;border-radius:30px;-webkit-border-radius:30px;-moz-border-radius:30px;width:auto; width:auto;;border-top:1px solid #2ac37d;border-right:1px solid #2ac37d;border-bottom:1px solid #2ac37d;border-left:1px solid #2ac37d;padding-top:5px;padding-bottom:5px;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:20px;display:inline-block;"><span style="line-height: 24px; word-break: break-word;"><span data-mce-style="font-size: 20px; line-height: 40px;" style="font-size: 20px; line-height: 40px;">Change Password</span></span></span></div>
                    <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                    </div>
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                    <div style="color:#555555;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                    <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 14px;">
                    <p style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 17px; margin: 0;"> </p>
                    <p style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 17px; margin: 0;"> </p>
                    <p style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 17px; margin: 0;"> </p>
                    <p style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 17px; margin: 0;">If you haven't requested for the password recovery / change,</p>
                    <p style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 17px; margin: 0;">report us at <a href="mailto:paragmahale36@gmail.com" rel="noopener" style="text-decoration: underline; color: #0068A5;" target="_blank">our@email.com</a></p>
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
        
                    // send an email with the valid link to reset the password from here
                    const mailOptions = {
                        from: process.env.EMAIL_SEND,  // sender's email
                        to: req.session.email, // receiver's email
                        subject: 'Purchase Receipt',
                        html:   template// template gose here
                    }
        
                    email.sendMail(mailOptions, err => {
                        if(err) console.log(err);
                        else{
                            console.log('email sent for password reset')
                        }
                    });
                }).catch((err) => {
                    console.log(err);
                    res.render('../views/500.ejs');
                }) ;
            }else{
                res.render('../views/login.ejs',{message: 'You are not logged in. Log in to proceed further.'})
            }
        });

        //post
        router.post('/update/pass/:id/:time', (req,res) => {
            // here, we will check ofr the upate password request in the collection by id and time and isUsed flag
            // if failed, render 404
            //else change the password and update isUsed flag to true
        
            updatePass.findById(req.params.id, (err, result) => {
                if(err){
                    // console.log(err);
                    res.render('../views/500.ejs');
                }else{
                    if(result.requestTime < req.params.time && result.expireTime > req.params.time && result.isUsed == 'false'){
        
                        updatePass.findOneAndUpdate({_id: result.id},{$set:{isUsed: 'true'}}, err => {
                            if(err){
                                // console.log(err);
                                res.render('../views/500.ejs');
                            }
                        });
        
                        const hashedPassword =  bcrypt.hash(req.body.password2, 10);
        
                        users.findByIdAndUpdate(req.session.passport.user, {'$set': {'password': hashedPassword}}).exec((err) => {
                            if(err){
                                // console.log(err);
                                res.render('../views/500.ejs');
                            }else{
                                res.redirect('/dashboard');
                            }
                        });
                    }
                }
            });
        });
    
    // /address

        //get
        router.get('/update/address', (req, res) => res.render('../views/updateaddress.ejs'));

        //post
        router.post('/update/address', (req,res) => {
            if(req.session.passport != undefined){
                users.findByIdAndUpdate(req.session.passport.user, {'$set': {'address': req.body.address, 'pin': req.body.pin}}).exec((err) => {
                    if(err){
                        console.log(err);
                        res.render('../views/500.ejs');
                    }else{
                        res.redirect('/dashboard');
                    }
                }); 
            }else{
                res.render('../views/login.ejs',{message: 'You are not logged in. Log in to proceed further.'})
            }
        });


// route "/dashboard/wishlist/add/:id"

router.get('/wishlist/add/:id', (req,res) => {

    if(req.session.passport != undefined){
        let a;  
        inventories.findOne({_id: req.params.id}, (err,result) => {
            if(err) {
                res.render('../views/500.ejs');
            }
            else{
            a = result;
            users.findByIdAndUpdate(req.session.passport.user, {'$push': {'wishlist': {'product_id': a._id, 'class': a.class, 'brand': a.brand, 'name': a.name, 'price': a.price, 'image': a.image}}}).exec((err) => {
                if(err) {
                    console.log(err);
                    res.render('../views/500.ejs');
                }
                else{
                    res.status(204).send().end();
                }
            });
            }
        });
    }else{
        res.render('../views/login.ejs',{message: 'You are not logged in. Log in to proceed further.'})
    }
});

// route "/dashboard/wishlist/remove/:id"
router.get('/wishlist/remove/:id', (req,res) => {
    if(req.session.passport != undefined){
        inventories.findOne({_id: req.params.id}, (err,result) => {
            if(err) {
                console.log(err);
                res.render('../views/500.ejs');
            }else{
                let a = result;
                users.findByIdAndUpdate(req.session.passport.user, {'$pull': {'wishlist': {'product_id': a._id, 'class': a.class, 'brand': a.brand, 'name': a.name, 'price': a.price}}}).exec((err) => {
                    if(err) console.log(err);
                    else{
                        res.redirect('/wishlist');
                    }
                });
            }
        });
    }else{
        res.render('../views/login.ejs',{message: 'You are not logged in. Log in to proceed further.'})
    }
})

module.exports = router;
