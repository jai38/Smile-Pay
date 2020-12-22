const express = require("express");
const User = require("./../../Models/User");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("./Login/paymentUndone");
});
router.post("/", (req, res) => {
  const { accountStatus, account } = req.body;
  if (accountStatus == "block") {
    User.deleteOne({ account: account }, (err, res) => {
      if (err) console.log(err);
    });
    res.redirect("../");
  } else {
    res.render("Login/face");
  }
});
module.exports = router;
