const express = require('express');

const router = express.Router();

router.get('*', (req, res) => {
    res.locals.site.pageTitle = '404! Page not found.'
    res.render('../views/404.ejs');
});

module.exports = router;