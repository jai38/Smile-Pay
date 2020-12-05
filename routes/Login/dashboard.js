const express = require('express');
const User = require('../../Models/User');

const router = express.Router();

router.get('/',(req,res) => {
    res.render('./Login/dashboard');
})
router.post('/',(req,res) => {
    let errors = [];
    const {currentAmount, amount, account} = req.body;
    if(currentAmount>amount) {
        errors.push({msg: "insufficant balance"});
    }
    if(errors.length>0) {
        res.render("Login/dashboard",{currentAmount,amount,account,errors});
    }
    // here we have to add one more error if user enters there own account number then we have to display, we pay huge amount for your payments to be done, dont waste your time in this!
    User.findOne( {account: account} )
    .then(user => {
        if(user) {
            res.render("Login/face"); 
        } else {
            errors.push({msg: "account number doesnt exists"});
            res.render("Login/dashboard",{currentAmount,amount,account,errors});
        }
    })
    console.log(errors);
})
module.exports = router;