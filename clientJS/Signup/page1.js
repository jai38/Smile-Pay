var firstDetails = {};
function getDetails(){
    firstDetails.name = document.getElementById('name').value;
    firstDetails.email = document.getElementById('email').value;
    firstDetails.number = document.getElementById('number').value;
    localStorage.setItem('firstDetails',JSON.stringify(firstDetails));
}
function checkDetails() {
    if(localStorage.getItem('firstDetails')!=null) {
        firstDetails = JSON.parse(localStorage.getItem('firstDetails'));
        document.getElementById('name').value = firstDetails.name;
        document.getElementById('email').value = firstDetails.email;
        document.getElementById('number').value = firstDetails.number;
    }
}