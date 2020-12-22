var thirdDetails = {};
function getDetails() {
  thirdDetails.username = document.getElementById("username").value;
  thirdDetails.password = document.getElementById("password").value;
  thirdDetails.pin = document.getElementById("pin").value;
  localStorage.setItem("thirdDetails", JSON.stringify(thirdDetails));
}
function checkDetails() {
  if (localStorage.getItem("thirdDetails") != null) {
    thirdDetails = JSON.parse(localStorage.getItem("thirdDetails"));
    document.getElementById("username").value = thirdDetails.username;
    document.getElementById("password").value = thirdDetails.password;
    document.getElementById("pin").value = thirdDetails.pin;
  }
}
