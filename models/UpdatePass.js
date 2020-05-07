// contains scheema for updatePass collection

const mongoose = require('mongoose');

const updatePassScheema = mongoose.Schema({
    uName:{
        type: String,
        required: true
    },
    uId:{
        type: String,
        required: true,
    },
    uEmail:{
        type: String,
        required: true
    },
    requestTime:{
        type: Date,
        default: Date.now()
    },
    expireTime:{
        type: Date,
        default: Date.now()  + 86400000
    },
    isUsed:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('updatePasses',updatePassScheema);