const mongoose = require('mongoose');

const ordersScheema = mongoose.Schema({
    // productId:{
    //     type: String,
    //     requied: true,
    //     trim: true
    // },
    // productClass:{
    //     type:String,
    //     requied: true,
    //     trim: true
    // },
    // productBrand:{
    //     type: String,
    //     requied: true,
    //     trim: true
    // },
    // productPrice:{
    //     type: Number,
    //     requied: true
    // },
    // productName:{
    //     type: String,
    //     requied: true,
    //     trim: true
    // },

    products:[{
        id: String,
        class: String,
        brand: String,
        price: Number,
        name: String
    }],
    userId:{
        type: String,
        requied: true,
        trim: true
    },
    userEmail:{
        type: String,
        requied: true,
        trim: true
    },
    userName:{
        type: String,
        requied: true,
        trim: true
    },
    userAddress:{
        type: String,
        requied: true,
        trim: true
    },
    orderDate:{
        type: Date,
        default: Date.now()
    },
    orderStatus:{
        type: String,
        default: 'ordered'
    },
    isReceiptPrinted:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('orders', ordersScheema);