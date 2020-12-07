const express = require('express');
const User = require('../../Models/User');

const router = express.Router();

router.get('/',(req,res) => {
    res.render('./Login/recoverPassword');
})
router.post('/', (req,res) => {
    const {username, password, password2} = req.body;
    const errors = [];
    if(password.length<8) {
        errors.push({msg: "password must be atleast 8 characters"});
        // res.render('Login/recoverPassword', {username, password, password2});
    }
    if(errors.length>0) {
        res.render('Login/recoverPassword');
    }
    if(password == password2) {
    console.log("all correct");
    User.updateOne({username: username},{password: password},(err) => {
        if(err)
            console.log(err)
        });
        res.redirect('/login/first');
        } else {
            console.log("something")
            errors.push({msg: "password didnt match"});
            res.render('Login/recoverPassword',{username,password,password2});
        }
})
module.exports = router;