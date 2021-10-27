const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


/* GET sign up page*/
router.get('/', function (req, res, next) {
    res.render('sign-up');
});


module.exports = router;
