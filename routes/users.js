if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const users = require('../models/User');
const flash = require('express-flash');

const app = express();

const router = express.Router();

//use the express-flash middleware

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
            fname: req.body.fname,
            age: req.body.age,
            email: req.body.email,
            pno: req.body.pno,
            password: hashedPassword,
            pin: req.body.pin,
            address: req.body.address,
        });

        newUser.save().then( (err) =>{
            if(err){
                console.log(err);
                res.render('../views/register.ejs');
               
            }else{
               // console.log('saved successfully');
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