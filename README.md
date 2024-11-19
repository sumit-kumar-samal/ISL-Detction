# Indian Sign Language (ISL) Detection System

## Project Overview
The ISL Detection System is a web-based application that uses machine learning to recognize and classify Indian Sign Language (ISL) hand signs in real-time using webcam or image upload functionality.

## Key Features
- Real-time webcam-based sign language detection
- Image upload for sign language recognition
- Machine learning model powered by Teachable Machine
- Responsive and user-friendly web interface
- Instant prediction with confidence percentage

## Technologies Used
- HTML5
- CSS3
- JavaScript
- TensorFlow.js
- Teachable Machine
- MobileNet Architecture

## Model Details
- **Model Type**: Image Classification
- **Platform**: Teachable Machine
- **Base Architecture**: MobileNet
- **Dataset**: [Indian Sign Language Dataset](https://www.kaggle.com/datasets/soumyakushwaha/indian-sign-language-dataset)

## About MobileNet
MobileNets are lightweight, efficient neural network architectures designed for mobile and embedded vision applications. Key characteristics include:
- Small model size
- Low latency
- Low power consumption
- Balanced trade-off between accuracy and computational efficiency

## Prerequisites
- Modern web browser
- Internet connection
- Webcam (for real-time detection)

## How to Use
1. Open the web application
2. Wait for the model to load
3. Choose detection method:
   - Click "Start Webcam" for real-time detection
   - Upload an image for sign recognition
4. View instant prediction results with confidence percentage

## Installation
1. Clone the repository
   ```
   git clone https://github.com/sumit-kumar-samal/ISL-Detection-System.git
   ```
2. Open `index.html` in a web browser

## Technologies and Libraries
- [TensorFlow.js](https://www.tensorflow.org/js)
- [Teachable Machine](https://teachablemachine.withgoogle.com/)
- MobileNet

## Limitations
- Requires modern browser support
- Performance depends on image quality and lighting
- Limited to trained sign language categories

## Acknowledgments
- Teachable Machine
- TensorFlow.js
- Open-source community
