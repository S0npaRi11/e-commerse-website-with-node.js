const mongoose = require('mongoose');

const ordersScheema = mongoose.Schema({
    productId:{
        type: String,
        requied: true
    },
    productClass:{
        type:String,
        requied: true
    },
    productBrand:{
        type: String,
        requied: true
    },
    productPrice:{
        type: Number,
        requied: true
    },
    productName:{
        type: String,
        requied: true
    },
    userId:{
        type: String,
        requied: true
    },
    userEmail:{
        type: String,
        requied: true
    },
    userName:{
        type: String,
        requied: true
    },
    userAddress:{
        type: String,
        requied: true
    },
    orderDate:{
        type: Date,
        default: Date.now()
    },
    orderStatus:{
        type: String,
        default: 'ordered'
    }
});

module.exports = mongoose.model('orders', ordersScheema);