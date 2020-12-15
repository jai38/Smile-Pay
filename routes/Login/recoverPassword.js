const express = require('express');
const User = require('../../Models/User');

const router = express.Router();
const getHashed = (hash) => {
    let hashed = "";
    for(let i = 0; i < hash.length; i++) {
        hashed += String.fromCharCode(hash[i].charCodeAt(0) + 17) + String.fromCharCode(Math.floor(Math.random()*97)+30);
    }
    return hashed;
}
router.get('/',(req,res) => {
    res.render('./Login/recoverPassword');
})
router.post('/', (req,res) => {
    const {username, password, password2} = req.body;
    const errors = [];
    if(password.length<8) {
        errors.push({msg: "Password must be atleast 8 characters"});
        // res.render('Login/recoverPassword', {username, password, password2});
    }
    if(errors.length>0) {
        res.render('Login/recoverPassword',{errors});
    }
    if(password == password2) {
    console.log("all correct");
    let hashedPassword = getHashed(password);
    User.updateOne({username: username},{password: hashedPassword},(err) => {
        if(err)
            console.log(err)
        });
        res.redirect('/login/first');
        } else {
            console.log("something")
            errors.push({msg: "Password didn't match"});
            res.render('Login/recoverPassword',{errors,username,password,password2});
        }
})
module.exports = router;