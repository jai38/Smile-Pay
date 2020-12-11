const express = require('express');
// const canvas = require('canvas');
const localStorage = require('local-storage');
const User = require('../../Models/User');
// const faceapi = require('face-api.js');
const getHashed = (hash) => {
    let hashed = "";
    if(hash.length>50) {
        for(let i = 0; i < 10; i++) {
            hashed += String.fromCharCode(Math.floor(Math.random()*97)+30);
        }
        hashed += hash;
    } else {
        for(let i = 0; i < hash.length; i++) {
                hashed += String.fromCharCode(hash[i].charCodeAt(0) + 17) + String.fromCharCode(Math.floor(Math.random()*97)+30);
        }
    }
    return hashed;
}
const router = express.Router();
router.get('/',(req,res) => {
    res.render('./Signup/face');
})
router.post('/', (req,res) => {
    let { imgLink } = req.body;
    let errors = []
    let newUserFace = new User({
        imgLink
    });
    // console.log(imgLink);
    var first =JSON.parse(localStorage.get('signupFirst'));
    var second = JSON.parse(localStorage.get('signupSecond'));
    var third = JSON.parse(localStorage.get('signupThird'));
    third.password = getHashed(third.password);
    third.pin = getHashed(third.pin);
    imgLink = getHashed(imgLink)
    if(second.aadhar!=null){
        const newUser = new User({
            name: first.name,
            number: first.number,
            email: first.email,
            account: second.account,
            aadhar: second.aadhar,
            username: third.username,
            password: third.password,
            pin: third.pin,
            totalAmount: 10000,
            imgLink: imgLink
        });
        newUser.save().then
        res.render('Signup/sucessfull');
    } else {
        const newUser = new User({
            name: first.name,
            number: first.number,
            email: first.email,
            account: second.account,
            pan: second.pan.toUpperCase(),
            username: third.username,
            password: third.password,
            pin: third.pin,
            totalAmount: 10000,
            imgLink: imgLink
        });
        newUser.save().then
        res.render('Signup/sucessfull');
    }
})
module.exports = router;