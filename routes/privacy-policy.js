const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.render('../views/privacy-policy.ejs'));

module.exports = router;