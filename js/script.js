// Constants and Variables
const MODEL_URL = "https://teachablemachine.withgoogle.com/models/FG8ujUXeX/";
let model, webcam;
let isWebcamActive = false;

// DOM Elements
const elements = {
    datetime: document.getElementById('datetime'),
    webcamButton: document.getElementById('webcamButton'),
    stopButton: document.getElementById('stopButton'),
    webcamContainer: document.getElementById('webcam-container'),
    previewContainer: document.getElementById('preview-container'),
    previewImage: document.getElementById('preview-image'),
    resultContainer: document.getElementById('result-container'),
    status: document.querySelector('.status')
};

// DateTime Update Function
function updateDateTime() {
    const now = new Date();
    const dateStr = now.toISOString().replace('T', ' ').slice(0, 19);
    elements.datetime.textContent = `Current Date and Time (UTC): ${dateStr}`;
}

// Model Loading Function
async function loadModel() {
    const modelURL = MODEL_URL + "model.json";
    const metadataURL = MODEL_URL + "metadata.json";
    
    elements.status.textContent = "Loading model...";
    try {
        model = await tmImage.load(modelURL, metadataURL);
        elements.status.textContent = "Model loaded! Choose your input method.";
    } catch (error) {
        elements.status.textContent = "Error loading model: " + error.message;
    }
}

// Image Upload Handler
async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        if (isWebcamActive) {
            stopWebcam();
        }

        elements.previewContainer.style.display = 'block';
        const fileUrl = window.URL.createObjectURL(file);
        elements.previewImage.src = fileUrl;
        
        elements.previewImage.onload = async () => {
            await predict(elements.previewImage);
            window.URL.revokeObjectURL(fileUrl);
        }
    }
}

// Webcam Control Functions
async function toggleWebcam() {
    if (!isWebcamActive) {
        elements.previewContainer.style.display = 'none';
        elements.webcamContainer.style.display = 'block';
        
        const flip = true;
        webcam = new tmImage.Webcam(400, 400, flip);
        try {
            await webcam.setup();
            await webcam.play();
            isWebcamActive = true;
            window.requestAnimationFrame(loop);
            elements.status.textContent = "Webcam active";
            elements.webcamButton.style.display = 'none';
            elements.stopButton.style.display = 'inline-block';
        } catch (error) {
            elements.status.textContent = "Error accessing webcam: " + error.message;
        }
    }
}

function stopWebcam() {
    if (isWebcamActive && webcam) {
        webcam.stop();
        elements.webcamContainer.style.display = 'none';
        isWebcamActive = false;
        elements.status.textContent = "Webcam stopped";
        elements.webcamButton.style.display = 'inline-block';
        elements.stopButton.style.display = 'none';
        elements.resultContainer.innerHTML = "";
    }
}

// Prediction Loop
async function loop() {
    if (isWebcamActive) {
        webcam.update();
        await predict(webcam.canvas);
        window.requestAnimationFrame(loop);
    }
}

// Prediction Function
async function predict(imageElement) {
    try {
        const prediction = await model.predict(imageElement);
        
        // Find the prediction with highest probability
        let topPrediction = prediction.reduce((max, current) => 
            current.probability > max.probability ? current : max
        );

        // Display top prediction
        const percentage = (topPrediction.probability * 100).toFixed(1);
        elements.resultContainer.innerHTML = 
            `Sign: <strong>${topPrediction.className}</strong> (${percentage}% confidence)`;
        
    } catch (error) {
        elements.status.textContent = "Error making prediction: " + error.message;
    }
}

// Initialization
window.addEventListener('load', () => {
    loadModel();
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

// Cleanup
window.addEventListener('beforeunload', () => {
    if (isWebcamActive && webcam) {
        webcam.stop();
    }
});