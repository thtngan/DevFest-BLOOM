//Thông tin người nhận tiền
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const listProjectSchema = new mongoose.Schema({
    ProjectName: {
        type: String
    },
    ProjectLink: {
        type: String
    }
})

const fundraiserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    CMND: {
        type: String
    },
    FullName: {
        type: String
    },
    Email: {
        type: String,
        unique: true
    },
    Money: {
        type: String
    },
    NumberMetaMask: {
        type: String
    },
    Project: [listProjectSchema]
});

module.exports = mongoose.model('fundraiser', fundraiserSchema, 'Fundraiser')