const express = require('express');
// const canvas = require('canvas');
const localStorage = require('local-storage');
const User = require('../../Models/User');
// const faceapi = require('face-api.js');
const getHashed = (hash) => {
    let hashed = "";
        for(let i = 0; i < hash.length; i++) {
                hashed += String.fromCharCode(hash[i].charCodeAt(0) + 17) + String.fromCharCode(Math.floor(Math.random()*85)+40);
        }
    return hashed;
}
const router = express.Router();
router.get('/',(req,res) => {
    res.render('./Signup/face');
})
router.post('/', (req,res) => {
    let {name, email, number, account, aadhar, pan, username, password, pin, imgLink } = req.body;
    let errors = []
    let newUserFace = new User({
        imgLink
    });
    // console.log(imgLink);
    password = getHashed(password);
    pin = getHashed(pin);
    if(aadhar!='000000000000'){
        const newUser = new User({
            name: name,
            number: number,
            email: email,
            account: account,
            aadhar: aadhar,
            username: username,
            password: password,
            pin: pin,
            totalAmount: 10000,
            imgLink: imgLink
        });
        newUser.save().then
        res.render('Signup/sucessfull');
    } else {
        const newUser = new User({
            name: name,
            number: number,
            email: email,
            account: account,
            pan: pan.toUpperCase(),
            username: username,
            password: password,
            pin: pin,
            totalAmount: 10000,
            imgLink: imgLink
        });
        newUser.save().then
        res.render('Signup/sucessfull');
    }
})
module.exports = router;