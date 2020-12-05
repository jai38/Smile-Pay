let flag = false;
var id = 1;
const displayAadhar = () => {
    id = 1;
    document.getElementById('displayAadhar').style.display = 'block';
    document.getElementById('displayPan').style.display = 'none';
}
const displayPan = () => {
    id = 2;
    document.getElementById('displayPan').style.display = 'block';
    document.getElementById('displayAadhar').style.display = 'none';
}
if(id == 1) {
    document.getElementById('pan').value = 0000000000;
}
if(id == 2) {
    document.getElementById('aadhar').value = 0000000000;
}