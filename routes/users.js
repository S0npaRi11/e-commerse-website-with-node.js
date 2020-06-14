if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const bcrypt = require('bcrypt');
const users = require('../models/User');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();
const router = express.Router();
app.use(passport.session());
app.use(flash());

router.get('/register', (req,res) => {
    res.render('../views/register.ejs');
});

router.post('/register', async (req,res) => {

    try{
        const hashedPassword = await bcrypt.hash(req.body.password1, 10);
        const newUser = new users({
            fname: req.body.fname.trim(),
            email: req.body.email.trim(),
            pno: req.body.pno.trim(),
            password: hashedPassword.trim(),
            pin: req.body.pin.trim(),
            address: req.body.address.trim(),
        });
        newUser.save().then( () =>{
            res.render('../views/login.ejs');
        }).catch(() => {
            console.log(err);
            res.render('../views/500.ejs');
        });
    }
    catch{
        res.redirect('/register');
    }
});

module.exports = router;