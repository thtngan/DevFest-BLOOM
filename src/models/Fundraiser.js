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
    Money: {
        type: String
    },
    NumberMetaMask: {
        type: String
    },
    List: {
        type: [listProjectSchema],
        default: undefined
    }
});

module.exports = mongoose.model('fundraiser', fundraiserSchema, 'Fundraiser')
