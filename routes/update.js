const express = require('express');

const router = express.Router();

router.get('/updatepass', (req, res) => res.render('../views/updatepass.ejs'));

router.get('/updateaddress', (req, res) => res.render('../views/updateaddress.ejs'));

// router.get('/orders', (req, res) => res.render('../views/previous.ejs'));

module.exports = router;