const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const project = require('../src/models/Project');
const donor = require('../src/models/Donor');
const Web3 = require('web3');

const { verifyToken, isDonor, isFundraiser } = require("../middlewares/auth.jwt");
const web3 = new Web3(
    new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/7771ec896eed44338f3debadbf6e047f")
);

/* GET donate of project page*/
router.get('/', (req, res, next) => {
    project.find({}, (err, prj) => {
        res.render('donate', { projectList: prj });
    })
});



router.get('/success/:prj/:hashID', (req, res) => {
    var transactionHash = req.params['hashID'];
    const projectName = req.params['prj'];
    console.log('/' + transactionHash + '/');
    var returnValue;
    web3.eth.getTransaction(transactionHash, function(error, result) {
        returnValue = web3.utils.fromWei(result.value, 'ether')
        console.log(result)
        web3.eth.getBlock(result.blockNumber, function(error, receipt) {
            console.log(receipt);
            var date1 = receipt.timestamp;
            var date = new Date(date1 * 1000);
            var fullDate = date.getDate() +
                "/" + (date.getMonth() + 1) +
                "/" + date.getFullYear() +
                " " + date.getHours() +
                ":" + date.getMinutes() +
                ":" + date.getSeconds();

            // //Balance from
            var balanceFrom;
            const balances = async() => {
                balanceFrom = web3.utils.fromWei(
                    await web3.eth.getBalance(result.from),
                    'ether'
                );

            };
            balances()
                .then(function(data) {
                    console.log(data);
                    hashTxn = data
                })
                .catch(function(err) { console.log(err) })
                .finally(function() {
                    res.render('../views/success', {
                        hashPrj: transactionHash,
                        sendNumber: result.from,
                        sendTime: fullDate,
                        project: projectName,
                        fundNumber: result.to,
                        sendMoney: returnValue,
                        sendLeft: balanceFrom
                    });
                })


        });

    });


})

router.get('/success', (req, res) => {
    res.render('../views/success')
})

router.get('/:name', verifyToken, isDonor, (req, res) => {
    var projectName = req.params.name;
    let users = JSON.parse(req.query.user);
    var userID = users.id;
    // console.log(userID)
    project.find({ Name: projectName }, (err, prj) => {
        donor.find({ _id: userID }, (err, donors) => {
            // console.log(prj);
            const addressFrom = donors[0].NumberMetaMask;
            const balances = async() => {
                const balanceFrom = web3.utils.fromWei(
                    await web3.eth.getBalance(addressFrom),
                    'ether'
                );
                // console.log(`The balance of ${addressFrom} is: ${balanceFrom} ETH`);
                res.render('donate', { project: prj, user: donors, money: balanceFrom });
            };
            balances();


        })
    })
});

async function deploy(addressFrom, addressTo, privateKey, moneyDonate) {
    console.log(
        `Attempting to send transaction from ${addressFrom} to ${addressTo} with ${moneyDonate}`
    );
    // Sign Tx with PK
    const createTransaction = await web3.eth.accounts.signTransaction({
            gas: 21000,
            to: addressTo,
            value: web3.utils.toWei(moneyDonate, 'ether'),
        },
        privateKey
    );
    // Send Tx and Wait for Receipt
    const createReceipt = await web3.eth.sendSignedTransaction(
        createTransaction.rawTransaction
    )
    let hash = createReceipt.transactionHash;
    console.log(
        `Transaction successful with hash: ${hash}`
    );
    return hash;

}

router.post('/:name', async(req, res, next) => {
    let userId = req.body.userId;
    const namePrj = req.params.name;
    var donateMoney = req.body.moneyDonate;
    donateMoney /= 70000000;
    donatePrj = donateMoney.toString();
    donor.findOne({ _id: userId }, (err, donors) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        var pass = donors.Password == req.body.password;
        if (!pass) {
            return res.status(401).send({ message: "Sai mật khẩu!" });
        }
        const privateKey = donors.PrivateKey;
        const addressFrom = donors.NumberMetaMask;

        /*Transaction*/
        var hashTxn;
        project.find({ Name: namePrj }, (err, prj) => {
            const addressTo = prj[0].MetaMask;
            deploy(addressFrom, addressTo, privateKey, donatePrj)
                .then(function(data) {
                    console.log(data);
                    hashTxn = data
                })
                .catch(function(err) { console.log(err) })
                .finally(function() {
                    console.log('Done')
                    res.status(200).send({
                        message: "Giao dịch thành công",
                        hash: hashTxn
                    });
                })
        });

    });
});


module.exports = router;