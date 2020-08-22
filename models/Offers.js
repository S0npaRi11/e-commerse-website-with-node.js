const mongoose = require('mongoose');

const offersScheema =  mongoose.Schema({
    title:{
        type:String,
        trim: true,
        required: true
    },
    description:{
        type: String,
        trim: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    endOn:{
        type: Date,
        required: true
    },
    image:{
        type: String,
        trim: true,
        required: true
    },
    link: {
        type: String
    },
    products: {
        type: Array,
        default: [],
        required: true
    }
})

module.exports = mongoose.model('offers', offersScheema);