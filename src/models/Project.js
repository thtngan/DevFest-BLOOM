//Thông tin dự án
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const listDonorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    DonorName: {
        type: String
    },
    DonorTime: {
        type: String
    },
    DonorId: {
        type: String
    },
    DonorSend: {
        type: String
    }
})

const projectSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Name: {
        type: String
    },
    Fundraiser: {
        type: String
    },
    Location: {
        type: String
    },
    Purpose: {
        type: String
    },
    Money: Number,
    Quantity: String,
    ListDonor: [listDonorSchema],
    Img: [String],
    DateEnd: String,
    MetaMask: String
});



module.exports = mongoose.model('project', projectSchema, 'Project')
