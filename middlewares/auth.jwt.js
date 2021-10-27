const jwt = require("jsonwebtoken");
const config = require("../config/auth");
const User = require('../src/models/User');

function verifyToken(req, res, next) {
    let user = JSON.parse(req.query.user);
    if (!user) {
        res.status(403)
        return res.render('forbidden', { message: 'Need to signin', code: '403' })
    }
    let token = user.token;
    console.log(token);
    if (!token) {
        res.status(403)
        return res.render('forbidden', { message: 'Need to signin', code: '403' })
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            res.status(401);
            return res.render('forbidden', { message: 'Unauthorized!', code: '401' })
        }
        req.userId = decoded.id;
        next();
    });
};

function isDonor(req, res, next) {
    console.log(req.userId)
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500)
            res.render('forbidden', { message: err, code: '500' })
            return;
        }
        if (user.Role === 0) {
            next();
            return;
        }
        res.status(403)
        res.render('forbidden', { message: 'Not Allow', code: '403' })
        return;

    });
};
module.exports = {
    verifyToken,
    isDonor
};