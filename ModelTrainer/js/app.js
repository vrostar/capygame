
const video = document.getElementById("webcam");
const label = document.getElementById("label");

const labelOneBtn = document.querySelector("#labelOne");
const labelTwoBtn = document.querySelector("#labelTwo");
const labelThreeBtn = document.querySelector("#labelThree");
const trainbtn = document.querySelector("#train");
const saveButton = document.querySelector("#save");

labelOneBtn.addEventListener("click", () => addCapy() + console.log("Capybara"));
labelTwoBtn.addEventListener("click", () => addUgly() + console.log("Ugly"));
labelThreeBtn.addEventListener("click", () => classify() + console.log("classify"));

trainbtn.addEventListener("click", () => trainModel() + console.log("train"));
saveButton.addEventListener("click", () => saveModel() + console.log("save"));

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.log("Something went wrong!");
        });
}
function addCapy() {
// Add a new image with a label
    classifier.addImage(document.getElementById('webcam'), 'capy');
}

function saveModel() {
// Add a new image with a label
    featureExtractor.save();
}

function addUgly() {
// Add a new image with a label
    classifier.addImage(document.getElementById('webcam'), 'ugly');
}

// Extract the already learned features from MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);

// When the model is loaded
function modelLoaded() {
    console.log('model Loaded!');
}

// Create a new classifier using those features and with a video element
const classifier = featureExtractor.classification(video, videoReady);

// Triggers when the video is ready
function videoReady() {
    console.log('The video is ready!');
}

// Retrain the network
function trainModel()
{
    classifier.train((lossValue) => {
        console.log('Loss is', lossValue);
    });
}

// Get a prediction for that image
function classify() {
    classifier.classify(document.getElementById('webcam'), (err, result) => {
        console.log(result); // Should output 'ugly' or 'capy'
        label.innerText = result[0].label;
    });
}
