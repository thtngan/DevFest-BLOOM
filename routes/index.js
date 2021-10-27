const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const project = require('../src/models/Project');
const donor = require('../src/models/Donor');
const fundraiser = require('../src/models/Fundraiser');


/* GET home page. */
router.get('/', function (req, res, next) {
  project.find({}, (err, prj) => {
    donor.find({}, (err, donor) => {
      res.render('index', { projectList: prj, donorList: donor });
    })
  })
});

module.exports = router;
