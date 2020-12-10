const express = require('express');
const User = require('../../Models/User');
const localStorage = require('local-storage');
const fs = require('fs');
const router = express.Router();
router.get('/',(req,res,next) => {
    User.findOne({_id: req.query.id})
    .then(user => {
        if(user) {
            res.render('Login/dashboard',{user});
        }
    })
})
router.post('/',(req,res) => {
    let errors = [];
    const {currentBalance, amount, account} = req.body;
    console.log(currentBalance);
    console.log(amount);
    if(parseInt(amount)<=0) {
        errors.push({msg: "amount can not be negative or 0"});
    }
    if(parseInt(currentBalance)<parseInt(amount)) {
        errors.push({msg: "insufficant balance"});
    }
    if(errors.length>0) {
        res.render("Login/dashboard");
    }
    // here we have to add one more error if user enters there own account number then we have to display, we pay huge amount for your payments to be done, dont waste your time in this!
    User.findOne( {account: account} )
    .then(user => {
        if(user) {
            res.render("Login/face");
        } else {
            errors.push({msg: "account number doesnt exists"});
            res.render("Login/dashboard");
        }
    })
})
module.exports = router;