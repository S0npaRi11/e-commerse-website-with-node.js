if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const mongoStore = require('connect-mongo')(session);
const path = require('path');

const app = express();

// connecting to the server
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
const db = mongoose.connection
db.on('error', error => console.error(error));
db.once('open', () => console.log('connected to the user database'));

//all app.use() here
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({
        mongooseConnection: db
    }),
}));
app.use(expressLayouts);
app.use(express.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + '/public')));
app.use(flash());
app.use(passport.initialize());

app.use(function (req, res, next) {
    res.locals.user = req.session.passport ? true : false;
    res.locals.message = req.flash('message');
    res.locals.error = req.flash('error');
    res.locals.cart = req.session.cart;
    res.locals.site = {
        title: 'mobilebazar.com',
        descprition: 'Buy used smartphones at an affordable price ',
        logoNavbar: '../../images/4.png',
        logoFooter: '../../images/5.png',
        pageTitle : ''
    }
    next();
});
//all routes here

    // All the static routes here 
    app.use('/', require('./routes/static.js'));

    // All authentication related routes here
    app.use('/users', require('./routes/auth.js'));

    // All dashboard routes here
    app.use('/dashboard', require('./routes/dashboard.js'));

    // All store routes here
    app.use('/store', require('./routes/store.js'));

    // Product Details route here
    app.use('/product', require('./routes/product.js'));

    // Search route here
    app.use('/search', require('./routes/search.js'));

    // Purchase route here
    app.use('/purchase', require('./routes/purchase.js'));

    // Cart route here
    app.use('/cart', require('./routes/cart.js'));

    // Offers route here
    app.use('/offer', require('./routes/offer.js'));

    //404 route here
    app.use('*', require('./routes/404.js'));

//routes end

app.listen(process.env.PORT || 3000);