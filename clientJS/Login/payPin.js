var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
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
function getPin() {
    var pin = document.getElementById('pin').value;
    console.log(pin);
    let unhashedPin = getUnhashed(loggedInUser.pin);
    if(unhashedPin == pin) {
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