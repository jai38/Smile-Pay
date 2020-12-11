const express = require('express');
// const canvas = require('canvas');
const localStorage = require('local-storage');
const User = require('../../Models/User');
// const faceapi = require('face-api.js');
const router = express.Router();
router.get('/',(req,res) => {
    res.render('./Signup/face');
})
// Promise.all([
//     faceapi.nets.faceRecognitionNet.loadFromDisk('./modelsFace'),
//     faceapi.nets.faceLandmark68Net.loadFromDisk('./modelsFace'), 
//     faceapi.nets.ssdMobilenetv1.loadFromDisk('./modelsFace'), 
//   ])
router.post('/', (req,res) => {
    const { imgLink } = req.body;
    let errors = []
    const newUserFace = new User({
        imgLink
    });
    // console.log(imgLink);
    var first =JSON.parse(localStorage.get('signupFirst'));
    var second = JSON.parse(localStorage.get('signupSecond'));
    var third = JSON.parse(localStorage.get('signupThird'));
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