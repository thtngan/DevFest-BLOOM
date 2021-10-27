//Thông tin người gửi tiền
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const listDonorSchema = new mongoose.Schema({
    ProjectName: {
        type: String
    },
    ProjectLink: {
        type: String
    }
})

const donorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    FullName: {
        type: String
    },
    CMND: {
        type: String
    },
    Email: {
        type: String
    },
    NumberMetaMask: {
        type: String
    },
    MoneyLeft: {
        type: Number
    },
    MoneySend: {
        type: Number
    },
    DateOfBirth: {
        type: String
    },
    Password: {
        type: String
    },
    PrivateKey: {
        type: String
    },
    Img: String
});



module.exports = mongoose.model('donor', donorSchema, 'Donor')