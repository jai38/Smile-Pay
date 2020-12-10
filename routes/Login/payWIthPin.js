const express = require('express');
const User = require('../../Models/User');
const router = express.Router();

router.get('/',(req,res) => {
    res.render('./Login/payWithPin');
})
router.post('/', (req,res) => {
    const {paymentStatus,accountOfRecipient,amountDebit,accountOfDonor} = req.body;
    console.log(accountOfRecipient);
    console.log(amountDebit);
    if(paymentStatus=="done") {
        User.updateOne({account: accountOfRecipient},{$inc: {totalAmount: parseInt(amountDebit)}},(err,res)=>{
            if(err)
            console.log(err);
        });
        User.updateOne({account: accountOfDonor},{$inc: {totalAmount: -parseInt(amountDebit)}}, (err,res) => {
            if(err)
            console.log(err);
        });
        res.redirect('/login/paymentDone');
    } else {
        console.log("account deleted");
        User.deleteOne({account: accountOfDonor},(err,res)=> {
            if(err)
            console.log(err);
        });
        res.redirect('../');
    }
})
module.exports = router;