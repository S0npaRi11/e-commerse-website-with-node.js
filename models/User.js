const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim:true
    },
    pno:{
        type: Number,
        required:true,
        unique: true,
        trim: true
    },
    address:{
        type: String,
        required: true,
        trim: true
    },
    pin:{
        type: String,
        required: true,
        trim: true
    },
    wishlist:{
        type: Array,
        default: [],
    },
    orders:{
        type: Array,
        default: [],
    }
});

module.exports = mongoose.model('users',userSchema);