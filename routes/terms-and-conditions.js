const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.render('../views/terms-and-conditions.ejs'));

module.exports = router;