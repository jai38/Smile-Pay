const express = require('express');
const User = require('../../Models/User');
const localStorage = require('local-storage');
const router = express.Router();

router.get('/',(req,res) => {
    res.render('./Signup/page2');
})

router.post('/', (req,res) => {
    const {account, aadhar, pan} = req.body;
    let errors = [];
    if(!account || !aadhar || !pan) {
        errors.push({msg : "Please fill all the details"});
    }
    if(errors.length>0) {
        res.render('Signup/page1',{errors,account,aadhar, pan});
        console.log(errors);
    }
    else User.findOne({account: account} || {aadhar: aadhar} || {pan: pan})
    .then(user => {
        if(user) {
            errors.push({msg: "Account No. or Aadhar No. is already taken"});
            res.render('Signup/page2', {errors,account,aadhar})
            console.log(errors + "dont know");
        } 
        else {
            if(pan==0000000000){
                const newUserSecond = new User({
                    account,
                    aadhar
                });
                localStorage.set('signupSecond',JSON.stringify(newUserSecond));
            }
            else {
                const newUserSecond = new User({
                    account,
                    pan
                });
                localStorage.set('signupSecond',JSON.stringify(newUserSecond));
            }
            // newUser.save()
            // .then(user => {
                console.log(localStorage.get('signupFirst'));
                console.log(localStorage.get('signupSecond'));
                res.redirect('third');
            // })
        }
    })
})
module.exports = router;