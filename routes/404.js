const express = require('express');

const router = express.Router();

router.get('*', (req, res) => res.render('../views/404.ejs'));

module.exports = router;