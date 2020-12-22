const express = require("express");
const User = require("./../../Models/User");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("./Login/face");
});
router.post("/", (req, res) => {
  const {
    paymentStatus,
    accountOfRecipient,
    amountDebit,
    accountOfDonor,
  } = req.body;
  console.log(accountOfRecipient);
  console.log(amountDebit);
  if (paymentStatus == "done") {
    User.updateOne(
      { account: accountOfRecipient },
      { $inc: { totalAmount: parseInt(amountDebit) } },
      (err, res) => {
        if (err) console.log(err);
      }
    );
    User.updateOne(
      { account: accountOfDonor },
      { $inc: { totalAmount: -parseInt(amountDebit) } },
      (err, res) => {
        if (err) console.log(err);
      }
    );
    res.redirect("/login/paymentDone");
  } else {
    res.redirect("/login/paymentUndone");
  }
});
module.exports = router;
