const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    pno:{
        type: Number,
        required:true,
        unique: true
    },
    address:{
        type: String,
        required: true
    },
    pin:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('users',userSchema);