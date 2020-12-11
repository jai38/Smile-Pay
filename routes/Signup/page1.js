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
        errors.push({msg: "Please enter valid mobile number(without country code or 0)"});
    }
    if(errors.length>0) {
        res.render('Signup/page1',{errors,name,number,email});
        console.log(errors);
    }
    else User.findOne({email: email})
    .then(user => {
        if(user) {
            errors.push({msg: "Email is already taken"});
            res.render('Signup/page1', {errors,name,number,email});
        } else {
            User.findOne({number: number})
            .then(user => {
                if(user) {
                    errors.push({msg: "Number is already taken"});
                    res.render('Signup/page1', {errors,name,number,email});
                } else {
                    const newUserFirst = new User({
                        name,
                        email,
                        number
                    });
                    localStorage.set('signupFirst',JSON.stringify(newUserFirst));
                    res.redirect('second');
                }
            })
        }
    })
})
module.exports = router;