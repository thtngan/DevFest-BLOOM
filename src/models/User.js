//Thông tin người gửi tiền
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ID: {
        type: String
    },
    Email: {
        type: String,
        unique: true
    },
    Password: {
        type: String
    },
    Role: {
        type: Number
    }
});



module.exports = mongoose.model('user', userSchema, 'User')