var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
var currentBalance = loggedInUser.totalAmount;
let flag = false;
function displayBalance() {
    if(!flag) {
        let amountFormatted = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(currentBalance);
        document.getElementById('amount').style.display = 'block';
        document.getElementById('amount').innerHTML = amountFormatted;
        flag = true;
    } else {
        document.getElementById('amount').style.display = 'none';
        flag = false;
    }
}