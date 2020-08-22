const express = require('express');
const messages = require('../models/Messages');

const router  = express.Router();

router.get('/', (req,res) => {

    messages.find({}, (error,result) => {
        if(error) console.error(error);
        else{
            res.render('./viewMessages.ejs',{messages: result});
        }
    })
});

module.exports = router;

