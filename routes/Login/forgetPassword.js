const express = require('express');
const User = require('../../Models/User');

const router = express.Router();
const getUnhashed = (hash) => {
    let unhashed = "";
    //getUnhashed
    for(let i = 0; i < hash.length; i++) {
        if(i%2==0) {
            unhashed += String.fromCharCode(hash[i].charCodeAt(0)-17);
        }
    }
    return unhashed;
}
router.get('/',(req,res) => {
    res.render('./Login/forgetPassword');
})
router.post('/', (req,res) => {
    const errors = [];
    const {username, pin} = req.body;
    User.findOne({username: username})
    .then(user => {
        if(user) {
            let unhashedPin = getUnhashed(user.pin);
            if(unhashedPin == pin) {
                res.redirect('recoverPassword');
            } else {
                errors.push({msg: "pin is incorrect"});
                res.render('Login/forgetPassword',{errors,username,pin});
            }
        } else {
            errors.push({msg: "invalid username"});
            res.render('Login/forgetPassword',{errors});
        }
    })
})
module.exports = router;