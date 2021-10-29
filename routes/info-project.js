const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const projectModel = require('../src/models/Project');
const recommendModel = require('../src/models/Project');
const fundraiserModel = require('../src/models/Fundraiser');
const userModel = require('../src/models/User');
const { verifyToken, isDonor, isFundraiser } = require("../middlewares/auth.jwt");

/* GET information of project page*/
router.get('/', function(req, res, next) {
    project.find({}, (err, prj) => {
        res.render('index', { projectList: prj });
    })
});
// router.get('/:name', async(req, res) => {
//     var projectName = req.params.name;
//     projectModel.find({ Name: projectName }, (err, prjs) => {
//         recommendModel.find({ Fundraiser: prjs[0].Fundraiser, Name: { $ne: projectName } }, (err, recommends) => {

//             res.render('info-project', { project: prjs, recommend: recommends });
//         })
//     })
// });
router.get('/:name', async(req, res) => {
    var projectName = req.params.name;
    let users = JSON.parse(req.query.user);
    projectModel.find({ Name: projectName }, (err, prjs) => {
        recommendModel.find({ Fundraiser: prjs[0].Fundraiser, Name: { $ne: projectName } }, (err, recommends) => {
            if (users === null) {
                console.log('null')
                res.render('info-project', { project: prjs, recommend: recommends, role: 0 });
                return;
            } else {
                var userID = users.id;
                userModel.findOne({ ID: userID }, (err, users) => {
                    if (users.Role === 1) {
                        console.log('funda')
                        res.render('info-project', { project: prjs, recommend: recommends, role: 1 });
                        return;
                    } else {
                        console.log('donor')
                        res.render('info-project', { project: prjs, recommend: recommends, role: 0 });
                        return;
                    }
                })
            }
        })
    })
});
router.get('/withdrawal/:name', verifyToken, isFundraiser, (req, res, next) => {
    let users = JSON.parse(req.query.user);
    var userID = users.id;
    var projectName = req.params.name;
    fundraiserModel.findOne({ _id: userID }, (err, fundraisers) => {
        if (err) {
            console.log(err);
            res.render('forbidden', { message: err, code: '403' })
            return;
        }
        var fund_prjs = fundraisers.Project;
        var flag = false;
        fund_prjs.forEach(element => {
            if (element.ProjectName == projectName) flag = true;
        });
        if (flag === true) {
            projectModel.findOne({ Name: projectName }, (err, prjs) => {
                var sum = 0;
                var listDonor = prjs.ListDonor;
                listDonor.forEach(ele => {
                    sum += Number(ele.DonorSend);
                });
                res.render('withdrawal', { project: prjs, money: sum });
                return;
            })
        } else {
            res.render('forbidden', { message: "Not Allow", code: '403' })
            return;
        }
    })


})



module.exports = router;