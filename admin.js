if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');

const app = express();

//connecting to daabase

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology:true});

const db = mongoose.connection;

db.on('error', error => console.log(error));
db.once('open', () => console.log('connected to the user database'));

//all app.use() here
app.use(expressLayouts);
app.use(express.urlencoded({extended: true}));
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

//all routes here
app.use('/', require('./admin/index.js'));
app.use('/add', require('./admin/addProducts.js'));
app.use('/', require('./admin/updateProducts.js'));
app.use('/', require('./admin/deleteProduct.js'));
app.use('/orders', require('./admin/orders.js'));
app.use('/offers', require('./admin/offers.js'));
app.use('/messages', require('./admin/messages.js'));

app.listen(5000);
