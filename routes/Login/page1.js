const express = require('express');
const localStorage = require('local-storage');
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
      res.render("Login/page1",{errors,username,password});
  } else User.findOne( {username: username})
  .then(user => {
      if(user){
          if(user.password == password) {
            localStorage.set("currentUser",JSON.stringify(user));
            res.redirect(`dashboard?id=${user.id}`);
          } else {
              errors.push({msg: "Incorrect password"});
              res.render("Login/page1",{errors,username});
          }
      } else {
          errors.push({msg: "no username exists"});
          res.render("Login/page1",{errors,username});
      }
  })
})
module.exports = router;