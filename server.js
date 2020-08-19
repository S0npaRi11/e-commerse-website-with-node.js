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
// app.use(passport.session());
app.use(function (req, res, next) {
    res.locals.user = req.session.passport ? true : false;
    res.locals.error = req.flash('error');
    next();
});
//all routes here

    // All the static routes here 
    app.use('/', require('./routes/static.js'));

    // All authentication related routes here
    app.use('/users', require('./routes/auth.js'));

    // All dashbosrd routes here
    app.use('/dashboard', require('./routes/dashboard.js'));

    // All store routes here
    app.use('/store', require('./routes/store.js'));

    // Product Details route here
    app.use('/product', require('./routes/product.js'));

    // Search route here
    app.use('/search', require('./routes/search.js'));

    // Purchase route here
    app.use('/purchase', require('./routes/purchase.js'));

    //404 route here
    app.use('*', require('./routes/404.js'));

//routes end


// app.use('/', require('./routes/index.js'));
// app.use('/about', require('./routes/about.js'));
// app.use('/contact', require('./routes/contact.js'));
// app.use('/', require('./routes/login.js'));
// app.use('/', require('./routes/users.js'));
// app.use('/store', require('./routes/store.js'));
// app.use('/', require('./routes/search.js'));
// app.use('/', require('./routes/prodDetails.js'));
// app.use('/', require('./routes/update.js'));

// app.use('*', require('./routes/404.js'));

app.listen(process.env.PORT || 3000);