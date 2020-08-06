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
    res.locals.user = req.session.passport.user;
    res.locals.error = req.flash('error');
    next();
});
//all routes here
app.use('/', require('./routes/index.js'));
app.use('/about', require('./routes/about.js'));
app.use('/contact', require('./routes/contact.js'));
app.use('/', require('./routes/login.js'));
app.use('/', require('./routes/users.js'));
app.use('/store', require('./routes/store.js'));
app.use('/', require('./routes/search.js'));
app.use('/', require('./routes/prodDetails.js'));
app.use('/', require('./routes/update.js'));
app.use('/purchase', require('./routes/purchase.js'));
app.use('*', require('./routes/404.js'));

app.listen(process.env.PORT || 3000);