const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


/* GET about page*/
router.get('/', function (req, res, next) {
    res.render('search');
});


module.exports = router;
