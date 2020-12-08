const express = require('express');
const User = require('../../Models/User')
const localStorage = require('local-storage');
const router = express.Router();

router.get('/',(req,res) => {
    res.render('./Signup/page1');
})

router.post('/', (req,res) => {
    const {name, number, email } = req.body;
    let errors = [];
    if(!name || !number || !email) {
        errors.push({msg : "Please fill all the details"});
    }
    if(number.length!=10) {
        errors.push({msg: "Mobile number should be of 10 digits"});
    }
    if(errors.length>0) {
        res.render('Signup/page1',{errors,name,number,email});
        console.log(errors);
    }
    else User.findOne({email: email} || {number: number})
    .then(user => {
        if(user) {
            errors.push({msg: "Email or Number is already taken"});
            res.render('Signup/page1', {errors,name,number,email})
            console.log(errors + "dont know");
        } else {
            const newUserFirst = new User({
                name,
                email,
                number
            });
            localStorage.set('signupFirst',JSON.stringify(newUserFirst));
            // newUser.save()
            // .then(user => {
                res.redirect('second');
            // })
        }
    })
})
module.exports = router;