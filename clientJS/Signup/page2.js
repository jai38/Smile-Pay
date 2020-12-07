let flag = false;
var id = 1;
var secondDetails = {};
function getDetails(){
    secondDetails.account = document.getElementById('account').value;
    secondDetails.aadhar = document.getElementById('aadhar').value;
    secondDetails.pan = document.getElementById('pan').value;
    console.log(secondDetails.pan);
    if(id == 2) {
        document.getElementById('aadhar').value = "000000000000";
        secondDetails.aadhar = "000000000000";
    }
    if(id == 1) {
        document.getElementById('pan').value = "0000000000";
        secondDetails.pan = "0000000000"
    }
    localStorage.setItem('secondDetails',JSON.stringify(secondDetails));
}
function checkDetails() {
    if(localStorage.getItem('secondDetails')!=null) {
        secondDetails = JSON.parse(localStorage.getItem('secondDetails'));
        if(secondDetails.aadhar=="000000000000") {
            document.getElementById('aadhar').value = "";
            document.getElementById('pan').value = secondDetails.pan;
        }
        if(secondDetails.pan=="0000000000") {
            document.getElementById('pan').value = "";
            document.getElementById('aadhar').value = secondDetails.aadhar;
        }
        document.getElementById('account').value = secondDetails.account;
    }
}
function displayAadhar () {
id = 1;
document.getElementById('id').value = id;
document.getElementById('displayAadhar').style.display = 'block';
document.getElementById('displayPan').style.display = 'none';
}
function displayPan (){
id = 2;
document.getElementById('id').value = id;
document.getElementById('displayPan').style.display = 'block';
document.getElementById('displayAadhar').style.display = 'none';
}