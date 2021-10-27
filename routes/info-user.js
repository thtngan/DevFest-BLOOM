const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const project = require('../src/models/Project');
const donor = require('../src/models/Donor');

/* GET information of project page*/
router.get('/', function (req, res, next) {
    project.find({}, (err, prj) => {
        res.render('info-user', { projectList: prj });
    })
});

router.get('/:id', async (req, res) => {
    var donorName = req.params.id;
    donor.find({ _id: donorName }, (err, us) => {
        project.find({ "ListDonor.DonorId": donorName }, (err, prj) => {
            console.log(prj);
            res.render('info-user', { user: us, project: prj });
        })

    })
});




module.exports = router;
