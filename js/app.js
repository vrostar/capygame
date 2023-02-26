
const video = document.getElementById("webcam");
const label = document.getElementById("label");
const classifyBtn = document.querySelector("#Classify");
const infoBtn = document.querySelector("#Info");
let points = 0

// Speech synthesis to give instructions
let synth = window.speechSynthesis

function speak(text) {
    if (synth.speaking) {
        console.log('still speaking...')
        return
    }
    if (text !== '') {
        let utterThis = new SpeechSynthesisUtterance(text)
        synth.speak(utterThis)
    }
}

speak("Welcome to capybara game")

classifyBtn.addEventListener("click", () => classify() + console.log("classify"));
infoBtn.addEventListener("click", () => speak("Make sure you have a Capybara in the video frame and press the Lets Go button."));

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

// Extract the already learned features from MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);

// Load the model
function modelLoaded() {
    featureExtractor.load('model/model.json');
    console.log('Loaded the model succesfully')
}

// Create a new classifier using those features and with a video element
const classifier = featureExtractor.classification(video, videoReady);

// Triggers when the video is ready
function videoReady() {
    console.log('The video is ready!');
}

// Get a prediction for the image
function classify() {
    classifier.classify(document.getElementById('webcam'), (err, result) => {
        console.log(result); // Should output 'ugly' or 'capy'
        label.innerText = result[0].label;
        if (result[0].label == "capy") {
            speak("omg thats a spicy capy yippee!!!")
            points += 1;
            document.getElementById("points").innerHTML = `THE CAPYBARA SCORE:${points}`;
        } else {
            speak("thats a ugly bara, not good ew")
        }
    });
}