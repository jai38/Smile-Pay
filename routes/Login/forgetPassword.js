const express = require('express');
const User = require('../../Models/User');

const router = express.Router();

router.get('/',(req,res) => {
    res.render('./Login/forgetPassword');
})
router.post('/', (req,res) => {
    const errors = [];
    const {username, pin} = req.body;
    User.findOne({username: username})
    .then(user => {
        if(user) {
            if(user.pin == pin) {
                res.redirect('recoverPassword');
            } else {
                errors.push({msg: "pin is incorrect"});
                res.render('Login/forgetPassword',{username,pin});
            }
        } else {
            errors.push({msg: "invalid username"});
            res.render('Login/forgetPassword');
        }
    })
})
module.exports = router;