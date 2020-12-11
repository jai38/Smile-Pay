var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
function getPin() {
    var pin = document.getElementById('pin').value;
    console.log(pin);
    if(loggedInUser.pin == pin) {
        loggedInUser.totalAmount -= localStorage.getItem('amountDebit');
        document.getElementById('paymentStatus').value = "done";
    } else {
        document.getElementById('paymentStatus').value = "undone";
    }
    document.getElementById('accountOfRecipient').value = localStorage.getItem('accountOfRecipient');
    document.getElementById('accountOfDonor').value = loggedInUser.account;
    document.getElementById('amountDebit').value = localStorage.getItem('amountDebit');
    document.getElementById('form').submit();
    localStorage.setItem('loggedInUser',JSON.stringify(loggedInUser));
}