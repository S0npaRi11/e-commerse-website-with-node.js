const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const users = require('../models/User');
const bcrypt = require('bcrypt');

const express = require('express');

const app = express();



function initialize(passport,getUserByEmail, getUserById){

    app.use(passport.initialize());
   // console.log('entered initialize password function');
    const authenticateUser = (email,password,done) => {
        console.log('entered authenticate user function');
        users.findOne({email: email}) 
            .then(user => {
                console.log(user);
                if(!user){
                    console.log('no user with that email');
                    return done(null,false,{message: 'No user with that email'});
                }

                bcrypt.compare(password,user.password, (err,isMatch) => {
                    if(err) throw err;

                    if(isMatch){
                        return done(null, user);
                    }else{
                        console.log('incorrect password')
                        return done(null,false,{message: 'Incorrect Password'});
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