const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const users = require('../models/User');
const bcrypt = require('bcrypt');

const express = require('express');

const app = express();

function initialize(passport,getUserByEmail, getUserById,req){

    app.use(passport.initialize());
    const authenticateUser = (email,password,done) => {
        users.findOne({email: email}) 
            .then(user => {
                if(!user){
                    return done(null,false,{message : 'no user with this email'});
                }

                bcrypt.compare(password,user.password, (err,isMatch) => {
                    if(err) throw err;

                    if(isMatch){
                        return done(null, user);
                    }else{
                        return done(null,false,{message : 'incorrect password'});
                    }
                })
            })
            .catch(error => console.error(error));
    }


    passport.use(new localStrategy({usernameField: 'email'}, authenticateUser));

    passport.serializeUser((user, done) => done(null,user.id));

    passport.deserializeUser((id, done) => done(null, getUserById(id)));


}

module.exports = initialize;