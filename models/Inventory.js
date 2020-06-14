const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    class:{
        type: String,
        required: true,
        trim: true
    },
    brand:{
        type: String,
        required :true,
        trim: true
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    stock:{
        type: Number,
        required: true
    },
    date: {
        type : Date,
        default: Date.now
    },
    image:{
        type : String,
        default: ' ',
        trim: true
    },
    sells:{
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('inventory', inventorySchema);