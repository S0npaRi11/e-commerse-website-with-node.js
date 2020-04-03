if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const mongoose = require('mongoose');


const app = express();

//all app.use() here
app.use(expressLayouts);
app.use(express.urlencoded({extended: true}));
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());

// connecting to the server

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true, useUnifiedTopology: true});

 const db = mongoose.connection

 db.on('error', error => console.error(error));
 db.once('open', () => console.log('connected to the user database'));


//all routes here
app.use('/', require('./routes/index.js'));
app.use('/about', require('./routes/about.js'));
app.use('/contact', require('./routes/contact.js'));
app.use('/', require('./routes/login.js'));
app.use('/', require('./routes/users.js'));
app.use('/', require('./routes/store.js'));
app.use('/', require('./routes/search.js'));
app.use('/', require('./routes/prodDetails.js'));
// app.use('/', require('./routes/dashboard.js'));
app.use('/', require('./routes/update.js'));

app.listen(process.env.PORT || 3000);
