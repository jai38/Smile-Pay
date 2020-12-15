const express = require('express');
const localStorage = require('local-storage');
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
    res.render('./Login/page1');
})
router.post('/',(req,res) => {
  let {username, password} = req.body;
  let errors = [];
  if(!username || !password) {
      errors.push({msg: "Please fill correct details"});
  }

  if(errors.length>0) {
      res.render("Login/page1",{errors,username,password});
  } else User.findOne( {username: username})
  .then(user => {
      if(user){
          let unhashedPassword = getUnhashed(user.password) 
          if(unhashedPassword == password) {
            localStorage.set("currentUser",JSON.stringify(user));
            res.redirect(`dashboard?id=${user.id}`);
          } else {
              errors.push({msg: "Incorrect password"});
              res.render("Login/page1",{errors,username});
          }
      } else {
          errors.push({msg: "No username exists"});
          res.render("Login/page1",{errors,username});
      }
  })
})
module.exports = router;