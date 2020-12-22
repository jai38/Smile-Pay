const express = require("express");
const User = require("../../Models/User");
const localStorage = require("local-storage");
const router = express.Router();
let currentUser = {};
router.get("/", (req, res, next) => {
  User.findOne({ _id: req.query.id }).then((user) => {
    if (user) {
      // res.writeHead(200,{'Content-Type':'application/json'})
      // res.write(JSON.stringify(user));
      // res.redirect('dashboard');
      res.render("Login/dashboard", { user });
    }
  });
});
router.post("/", (req, res) => {
  let errors = [];
  const { currentBalance, amount, account } = req.body;
  console.log(currentBalance);
  console.log(amount);

  // res.setHeader('Content-type','text/plain');
  if (parseInt(amount) <= 0) {
    errors.push({ msg: "Amount can not be negative or 0" });
  }
  if (parseInt(currentBalance) < parseInt(amount)) {
    errors.push({ msg: "Insufficant balance" });
  }
  if (errors.length > 0) {
    // for(let i = 0; i < errors.length; i++)
    // res.send(errors[i].msg);
    res.render("Login/dashboard", { errors, currentBalance, account, amount });
  }
  // here we have to add one more error if user enters there own account number then we have to display, we pay huge amount for your payments to be done, dont waste your time in this!
  User.findOne({ account: account }).then((user) => {
    if (user) {
      res.render("Login/face");
    } else {
      errors.push({ msg: "Account number doesn't exists" });
      // for(let i = 0; i < errors.length; i++)
      // res.send(errors[0])
      // res.redirect('dashboard');
      res.render("Login/dashboard", {
        errors,
        currentBalance,
        account,
        amount,
      });
    }
  });
});
module.exports = router;
