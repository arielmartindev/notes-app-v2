const express = require('express');
const router = express.Router();
const datos = require('../../package.json')

router.get('/', (req, res) => {
    res.render('index', { datos });
});

router.get('/about', (req, res) => {
    res.render('about');
});



module.exports = router;