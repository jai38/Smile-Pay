let flag = false;
var id = 1;
var secondDetails = {};
function getDetails(){
    secondDetails.account = document.getElementById('account').value;
    secondDetails.aadhar = document.getElementById('aadhar').value;
    secondDetails.pan = document.getElementById('pan').value;
    if(secondDetails.aadhar=="") {
        document.getElementById('addhar').value = "000000000000";
    }
    if(secondDetails.pan=="") {
        document.getElementById('pan').value = "0000000000";
    }
    localStorage.setItem('secondDetails',JSON.stringify(secondDetails));
}
function checkDetails() {
    if(localStorage.getItem('secondDetails')!=null) {
        secondDetails = JSON.parse(localStorage.getItem('secondDetails'));
        if(secondDetails.aadhar=="000000000000") {
            document.getElementById('addhar').value = "";
        }
        if(secondDetails.pan=="0000000000") {
            document.getElementById('pan').value = "";
        }
        document.getElementById('aadhar').value = secondDetails.aadhar;
        document.getElementById('account').value = secondDetails.account;
        document.getElementById('pan').value = secondDetails.pan;
    }
}
// if(id == 1) {
//     userSecond.Pan = " ";
// }
// if(id == 2) {
//     userSecond.Aadhar = " ";
// }
// secondDetails = JSON.stringify(userSecond);
// localStorage.setItem('secondDetails',secondDetails);
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