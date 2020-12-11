const express = require('express');
const User = require('../../Models/User');
const localStorage = require('local-storage');
const router = express.Router();

router.get('/',(req,res) => {
    res.render('./Signup/page2');
})
router.post('/',async (req,res) => {
    let errors = [];
    const {account, aadhar, pan, id} = req.body;
    if(!account || !aadhar || !pan) {
        errors.push({msg : "Please fill all the details"});
        res.render('Signup/page2',{errors,account,aadhar, pan,id});
        res.end()
    }
    if(account.length!=10) {
        errors.push({msg: "Account No. should be of 10 digits"});
        res.render('Signup/page2',{errors,account,aadhar, pan,id});
        res.end()
    }
    if(aadhar.length!=12) {
        errors.push({msg: "Aadhar No. should be of 12 digits"});
        res.render('Signup/page2',{errors,account,aadhar, pan,id});
        res.end()
    }
    if(pan.length!=10) {
        errors.push({msg: "Pan No should be of 10 digits"});
        res.render('Signup/page2',{errors,account,aadhar, pan,id});
        res.end()
    }
    await User.findOne({account: account})
    .then(user => {
        if(user) {
            errors.push({msg: "Account No. is already taken"});
            res.render('Signup/page2',{errors,account,aadhar, pan,id});
            res.end()
        }
    });
    await User.findOne({aadhar: aadhar})
    .then(user => {
        if(user){
            errors.push({msg: "Aadhar No. is already taken"});
            res.render('Signup/page2',{errors,account,aadhar, pan,id});
            res.end()
        }
    });
    await User.findOne({pan: pan.toUpperCase()})
    .then(user => {
        if(user){
            
            errors.push({msg: "Pan No. is already taken"});
            res.render('Signup/page2',{errors,account,aadhar, pan,id});
            res.end()
        }
    });
    if(id == 1 && aadhar == "000000000000"){
        errors.push({msg: "please select pan card"});
        res.render('Signup/page2',{errors,account,aadhar,pan,id});
        res.end()
    }
    else if(id == 2 && pan == "0000000000"){
        errors.push({msg: "please select aadhar card"});
        res.render('Signup/page2',{errors,account,aadhar,pan,id});
        res.end()
    }
    else {
        if(id == 1){
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
        if(errors.length==0)
        res.redirect('third');
    }
});

module.exports = router;