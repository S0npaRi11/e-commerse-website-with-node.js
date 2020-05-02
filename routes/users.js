if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const users = require('../models/User');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

const router = express.Router();

//use the express-flash middleware


// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
// }));

app.use(passport.session());

app.use(flash());

//connect to the database



router.get('/register', (req,res) => {
    res.render('../views/register.ejs');
});

// 

router.post('/register', async (req,res) => {

    // mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology:true});

    // const db = mongoose.connection;

    // db.on('error', error => console.log(error));
    // db.once('open', () => console.log('connected to the user database'));


    try{
        const hashedPassword = await bcrypt.hash(req.body.password1, 10);
        const newUser = new users({
            fname: req.body.fname.trim(),
            age: req.body.age.trim(),
            email: req.body.email.trim(),
            pno: req.body.pno.trim(),
            password: hashedPassword.trim(),
            pin: req.body.pin.trim(),
            address: req.body.address.trim(),
        });

        newUser.save().then( (err) =>{
            if(err){
                console.log(err);
                res.render('../views/register.ejs');
               
            }else{
               // console.log('saved successfully');
            //    req.session.user = newUser;
            //    console.log("session user" + req.session.user);
                res.render('../views/login.ejs');
                // db.close();
            }
        });

       
       
    }
    catch{
        res.redirect('/register');
    }
   // console.log(users);
});


// db.close()


module.exports = router;