const express = require('express');
const User = require('../../Models/User');
const localStorage = require('local-storage');
const router = express.Router();
const jsdom = require('jsdom')
router.get('/',(req,res) => {
    res.render('./Signup/page3');
})
router.post('/', (req,res) => {
    const {username, password, password2, pin} = req.body;
    let errors = [];
    if(!username || !password || !password2 || !pin) {
        errors.push({msg : "Please fill all the details"});
    }
    if(password!=password2) {
        errors.push({msg: "password didnt match"});
    }
    if(errors.length>0) {
        res.render('Signup/page3',{errors,username});
        console.log(errors);
    }
    else User.findOne({username: username})
    .then(user => {
        if(user) {
            errors.push({msg: "Username is already taken"});
            res.render('Signup/page3', {errors,username})
            console.log(errors + "dont know");
        } 
        else {
            const newUserThird = new User({
                username,
                password,
                pin
            });
            localStorage.set('signupThird',JSON.stringify(newUserThird));
            // newUser.save()
            res.redirect('face');
        }
    })
})
module.exports = router;