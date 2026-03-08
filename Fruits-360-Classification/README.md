<div align="center">

# 🍍 Fruits-360: High-Speed End-to-End MobileNetV2 for Flutter 📱
### *From Kaggle GPU Training to Cross-Platform Mobile Deployment*

[![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=flat-square&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/)
[![Flutter](https://img.shields.io/badge/Flutter-02569B?style=flat-square&logo=flutter&logoColor=white)](https://flutter.dev/)
[![Dart](https://img.shields.io/badge/Dart-0175C2?style=flat-square&logo=dart&logoColor=white)](https://dart.dev/)

</div>

---

## 🌟 Project Overview

This project represents a complete, **end-to-end Machine Learning lifecycle**. 

It begins with optimizing highly intensive image data pipelines on Kaggle GPUs using advanced `tf.data.AUTOTUNE` caching physics to drastically reduce training times. A lightweight **MobileNetV2** architecture was then trained on the massive *Fruits-360* dataset (containing over 130+ fruit and vegetable classes), achieving an outstanding **91% Final Test Accuracy**. 

Finally, the classification head was successfully exported into a minimized `.tflite` model, which is fully integrated into a modern, cross-platform **Flutter** mobile application that allows real-time inference directly from a smartphone camera.

---

## 📂 Professional Directory Structure

The repository is modularized into distinct, maintainable concerns—separating the Data Science environment from the Mobile Engineering environment:

```text
Fruits-360-Classification/
│
├── Fruits360_MobileNet_Train.ipynb  # 🧠 Core Kaggle Training & Optimization Pipeline
├── requirements.txt                 # 📦 Python Dependencies for the AI Training
├── README.md                        # 📖 Project Documentation (You are here)
│
├── models/                          # 💾 Saved Model Artifacts
│   ├── fruit_labels.txt             # Array of all 130+ distinct classes
│   ├── fruits_model.tflite          # The optimized, lightweight mobile model (3.3MB)
│   ├── model_phase1.keras           # Pre-trained core weights 
│   └── model_phase2_best.keras      # Fine-tuned architectural weights
│
└── fruits_360_app/                  # 📱 The Complete Flutter Application source
    ├── android/                     # Android native wrappers
    ├── ios/                         # iOS native wrappers
    ├── assets/
    │   └── models/                  # Direct link to TFLite model integration
    ├── lib/                         # 🎯 Flutter Dart Code
    │   ├── main.dart                # App Entry Point & Navigation
    │   ├── screens/
    │   │   └── home_screen.dart     # Beautiful Glassmorphism UI & Camera controllers
    │   └── services/
    │       └── tflite_service.dart  # Isolated RGB Normalization Tensor array logic
    └── pubspec.yaml                 # Flutter Dependencies (tflite_flutter, image_picker)
```

---

## ⚡ Technical Achievements

1. **Hardware-Accelerated Data Pipelines (`tf.data`)**
   - Eliminated massive CPU bottlenecks associated with legacy OpenCV reading loops.
   - Built an asynchronous pipeline using `.prefetch(AUTOTUNE)` to continuously load massive 128-image batches onto the GPU without memory crashing (`OOM` prevention).
2. **Native GPU Data Augmentation**
   - Refactored structural image morphing (`RandomFlip`, `RandomRotation`, `RandomZoom`) directly into the `tf.keras.Sequential` model layout so hardware handles mathematical manipulation—slashing Kaggle Epoch times by over **80%**.
3. **Advanced Transfer Learning (Phase 1 & Phase 2)**
   - Utilized a frozen *MobileNetV2* backbone to rapidly train a custom, densely-layered Top Classification Head.
   - Unfroze the highest 20 architectural layers of the backbone and utilized an ultra-low `1e-5` learning rate to fine-tune structural feature extraction specifically for complex fruit lighting environments, reaching **91% testing accuracy**.
4. **Isolated Service-Oriented Mobile Architecture**
   - Designed a pristine UI hierarchy using Flutter and `tflite_flutter`.
   - Extracted all heavy Tensor transformations (resizing 100x100 pixel grids and standardizing `RGB` ranges to bounds of `[-1.0, 1.0]`) into an isolated, reusable backend dart service.

---

## 🚀 Getting Started

### 1. Training the AI Model (Python)

To replicate the training results or tweak the architecture, simply install the required python environment:

```bash
pip install -r requirements.txt
```
Then, launch `jupyter notebook` and open `Fruits360_MobileNet_Train.ipynb`.

### 2. Running the Mobile App (Flutter)

To run the powerful end-to-end classifier directly on your phone:

1. Traverse into the mobile engineering folder:
```bash
cd fruits_360_app
```
2. Fetch the required cross-platform dart packages (`image`, `tflite_flutter`, `image_picker`):
```bash
flutter pub get
```
3. Connect an Android/iOS device (with USB debugging enabled) and launch:
```bash
flutter run
```

---

## 🤝 Let's Connect!
Built by **Sajjad Ali Shah**
- Connect on [LinkedIn](https://www.linkedin.com/in/sajjad-ali-shah47/)
- Follow on [Kaggle](https://www.kaggle.com/SajjadKhanYousafzai)
