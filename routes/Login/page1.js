const express = require('express');
const User = require('../../Models/User');
const router = express.Router();

router.get('/',(req,res) => {
    res.render('./Login/page1');
})
router.post('/',(req,res) => {
  const {username, password} = req.body;
  let errors = [];
  if(!username || !password) {
      errors.push({msg: "Please fill correct details"});
  }

  if(errors.length>0) {
      res.render("Login/page1",{username,password});
  } else User.findOne( {username: username})
  .then(user => {
      if(user){
          if(user.password == password) {
            res.render("Login/dashboard",{user});
          } else {
              errors.push({msg: "Incorrect password"});
          }
      }
  })
})
module.exports = router;