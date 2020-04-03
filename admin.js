const express = require('express');
const expressLayouts = require('express-ejs-layouts');


const app = express();

//all app.use() here
app.use(expressLayouts);
app.use(express.urlencoded({extended: true}));
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

//all routes here
app.use('/', require('./admin/index.js'));
app.use('/', require('./admin/addProducts.js'));
app.use('/', require('./admin/updateProducts.js'));
// app.use('/', require('./admin/deleteProduct.js'));
// app.use('/about', require('./routes/about.js'));
// app.use('/contact', require('./routes/contact.js'));
// app.use('/', require('./routes/login.js'));
// app.use('/', require('./routes/users.js'));
//app.use('/users', require('./routes/users.js'));

app.listen(5000);
