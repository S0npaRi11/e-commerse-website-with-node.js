const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    class:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required :true
    },
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
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
        default: ' '
    },
    sells:{
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('inventory', inventorySchema);