const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const donor = require('../src/models/User');
var jwt = require("jsonwebtoken");
const config = require("../config/auth");
/* GET about page*/
router.get('/', function(req, res, next) {
    res.render('log-in');
});

router.post('/', async(req, res, next) => {
    var email = req.body.userId;
    console.log(email);
    donor.findOne({ Email: email }, (err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            res.status(404).send({ message: "Không tồn tại" });
            return;
        }
        var passwordIsValid = req.body.password == user.Password;
        if (!passwordIsValid) {
            return res.status(401).send({ message: "Sai mật khẩu!" });
        }
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400
        });
        res.status(200).send({
            message: "Xin chào " + user.FullName,
            id: user.ID,
            acessToken: token
        });
    })
});

module.exports = router;