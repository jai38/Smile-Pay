function retryLeft() {
  let i = localStorage.getItem("retryLeft");
  i--;
  localStorage.setItem("retryLeft", i);
  document.getElementById("form").submit();
}
function checkRetryLeft() {
  let i = localStorage.getItem("retryLeft");
  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  document.getElementById(
    "retry-count"
  ).innerHTML = `Trails left: ${i}, then Your account will be permanently blocked`;
  if (i < 1) {
    localStorage.setItem("accountBlocked", "true");
    document.getElementById("accountStatus").value = "block";
    document.getElementById("account").value = loggedInUser.account;
    document.getElementById("form").submit();
  } else {
    document.getElementById("accountStatus").value = "active";
    document.getElementById("account").value = loggedInUser.account;
  }
}
