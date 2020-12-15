var data;
const video = document.getElementById('video')
var canvas;
var i;
var imgDetails = [];
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('../modelsFace'),
    faceapi.nets.faceLandmark68Net.loadFromUri('../modelsFace'),
    faceapi.nets.faceRecognitionNet.loadFromUri('../modelsFace'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('../modelsFace')
])
.then(startVideo)
function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
        )
}
// const descriptions = [];
// async function imageToData(data) {
//     // console.log(data)
// const img = await faceapi.fetchImage(data)
// const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
// descriptions.push(detections.descriptor);
// }
video.addEventListener('play', () => {
    if(imgDetails.length>1) {
        var context = canvas.getContext('2d');
        context.clearRect(0,0,canvas.width,canvas.height);
    }
    canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: canvas.width, height: canvas.height}
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video,
        new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
        const resizeDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizeDetections)
    }, 100)
})
async function capture() {
canvas = faceapi.createCanvasFromMedia(video)
var context = canvas.getContext('2d');
data = canvas.toDataURL('image/jpg');
// imageToData(data);
document.getElementById('imgLink').value = data;
console.log(document.getElementById('imgLink').value);
document.getElementById("box").style.display="block";
document.getElementById('close').style.display = "block";
localStorage.setItem('image1',data);
// document.getElementById('imgCount').innerHTML = "Photos left: " + i.toString();
// alert('something');
// location.reload();
}