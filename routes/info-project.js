const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const projectModel = require('../src/models/Project');
const recommendModel = require('../src/models/Project');

/* GET information of project page*/
router.get('/', function(req, res, next) {
    project.find({}, (err, prj) => {
        res.render('index', { projectList: prj });
    })
});
router.get('/withdrawal', (req, res, next) => {
    res.render('withdrawal');
});
router.get('/:name', async(req, res) => {
    var projectName = req.params.name;
    projectModel.find({ Name: projectName }, (err, prjs) => {
        recommendModel.find({ Fundraiser: prjs[0].Fundraiser, Name: { $ne: projectName } }, (err, recommends) => {

            res.render('info-project', { project: prjs, recommend: recommends });
        })
    })
});




module.exports = router;