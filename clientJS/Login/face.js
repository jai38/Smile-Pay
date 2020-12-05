const video = document.getElementById('video')
var canvas = document.getElementById('canvas');
var loadAllDetails = JSON.parse(localStorage.getItem('loggedInUser'));
localStorage.setItem('amountDebited','false');
var imgDetails = [];
var name;
var displaySize;
var faceMatcher;
var detections;
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
video.addEventListener('play',async () => {
    if(imgDetails.length>1) {
        var context = canvas.getContext('2d');
        context.clearRect(0,0,canvas.width,canvas.height);
    }
    canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    displaySize = { width: video.width, height: video.height}
    faceapi.matchDimensions(canvas, displaySize)
    const labeledFaceDescriptors = await loadLabelImages();
    faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
    setInterval(async () => {
        detections = await faceapi.detectAllFaces(video,
            new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
            const resizeDetections = faceapi.resizeResults(detections, displaySize)
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
            faceapi.draw.drawDetections(canvas, resizeDetections)
        }, 100)
})
var data;
async function capture() {
    canvas = faceapi.createCanvasFromMedia(video)
    var context = canvas.getContext('2d');
    var data = canvas.toDataURL('image/jpg')
    const img = await faceapi.fetchImage(data)
    detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
    // const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor));
    try{
        const resizedDetections = faceapi.resizeResults(detections,displaySize)
        const results = faceMatcher.findBestMatch(resizedDetections.descriptor);
        console.log(results.label);
        if(results.label == loadAllDetails.name) {
            document.getElementById('paymentStatus').value = "done";
        } else {
            document.getElementById('paymentStatus').value = "undone";
        }
    } 
    catch (e) {
        document.getElementById('paymentStatus').value = "undone";
    }
    document.getElementById('accountOfRecipient').value = localStorage.getItem('accountOfRecipient');
    document.getElementById('accountOfDonor').value = loadAllDetails.account;
    document.getElementById('amountDebit').value = localStorage.getItem('amountDebit');
    console.log(document.getElementById('paymentStatus').value);
    document.getElementById('form').submit()
}

function loadLabelImages() {
    const labels = [loadAllDetails.name]
    return Promise.all(
      labels.map(async label => {
        const descriptions = []
        const img1 = await faceapi.fetchImage(loadAllDetails.imgLink)
        detections = await faceapi.detectSingleFace(img1).withFaceLandmarks().withFaceDescriptor()
        descriptions.push(detections.descriptor);
        console.log(descriptions);
        return new faceapi.LabeledFaceDescriptors(label, descriptions)
      })
    )
  }