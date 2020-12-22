const { use } = require("../../routes/Signup/page3");

function getUsername() {
  var username = localStorage.getItem("username");
  document.getElementById("username").value = username;
}
