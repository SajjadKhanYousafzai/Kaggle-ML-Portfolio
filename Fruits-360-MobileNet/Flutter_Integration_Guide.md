# Flutter + TFLite Fruits-360 Integration Guide 📱🍍

You have successfully trained and converted a **MobileNetV2** model to `.tflite`, the ideal model topology for edge devices. Because VGG and ResNet are quite large and computationally heavy (resulting in app bloat and slow inference pipelines), MobileNet guarantees maximum smooth operation inside Flutter apps.

Here is the exact step-by-step end-to-end process for deploying into your mobile application.

## 1. Move Files to Your Flutter Assets

Copy the outputs from your Jupyter Notebook into your Flutter workspace:
* `fruits_model.tflite`
* `fruit_labels.txt`

Place both inside your Flutter project’s root `assets/` folder (create the folder if it does not exist).

## 2. Update `pubspec.yaml`

Include the latest TFLite package and expose your assets. Use the modern actively supported plugin `tflite_flutter`.

```yaml
dependencies:
  flutter:
    sdk: flutter
  tflite_flutter: ^0.10.4 # Or the latest stable version
  image_picker: ^1.0.4    # Helpful to pick images from camera/gallery
  image: ^4.1.3           # Helper for resizing buffers to 100x100 if necessary

flutter:
  assets:
    - assets/fruits_model.tflite
    - assets/fruit_labels.txt
```

## 3. Load Model and Perform Inference

In your Dart code, you simply initialize the TFLite interpreter and map the raw output to your labels:

```dart
import 'dart:io';
import 'package:flutter/services.dart';
import 'package:tflite_flutter/tflite_flutter.dart';
import 'package:image/image.dart' as img;

class FruitClassifier {
  Interpreter? _interpreter;
  List<String> _labels = [];

  // Called when app/screen initially loads
  Future<void> loadModel() async {
    // 1. Load Interpreter
    _interpreter = await Interpreter.fromAsset('assets/fruits_model.tflite');
    
    // 2. Load Labels
    final labelData = await rootBundle.loadString('assets/fruit_labels.txt');
    _labels = labelData.split('\n');
    print("Model loaded with ${_labels.length} classes.");
  }

  // Called when evaluating a standard image file
  Future<String> predictFruit(File imageFile) async {
    if (_interpreter == null) return "Model not loaded";

    // 1. Decode & Resize the image exactly to the 100x100 input size MobileNet was trained on
    var rawImage = img.decodeImage(imageFile.readAsBytesSync());
    var resizedImage = img.copyResize(rawImage!, width: 100, height: 100);

    // 2. Pre-process into appropriate [1, 100, 100, 3] Float32 buffer
    var inputBuffer = _imageToFloat32List(resizedImage, 100);

    // 3. Prepare an output buffer of size [1, 131] (or however many Fruit classes exist)
    var outputBuffer = List.filled(1 * _labels.length, 0.0).reshape([1, _labels.length]);

    // 4. Run model block execution
    _interpreter!.run(inputBuffer, outputBuffer);

    // 5. Calculate class with maximum probability
    List<double> scores = outputBuffer[0].cast<double>();
    int highestIndex = 0;
    double maxConfidence = 0.0;

    for (int i = 0; i < scores.length; i++) {
      if (scores[i] > maxConfidence) {
        maxConfidence = scores[i];
        highestIndex = i;
      }
    }

    // 6. Return mapped output
    return "Prediction: ${_labels[highestIndex]} (Confidence: ${(maxConfidence * 100).toStringAsFixed(1)}%)";
  }

  // Prepares the multi-dimensional float buffers mapped to MobileNetV2 inputs [-1, 1] normalization
  List<List<List<List<double>>>> _imageToFloat32List(img.Image image, int inputSize) {
    var convertedBytes = List.generate(
      1,
      (i) => List.generate(
        inputSize,
        (y) => List.generate(
          inputSize,
          (x) {
            var pixel = image.getPixelSafe(x, y);
            // MobileNetV2 normalizes between [-1, 1]
            return [
              (pixel.r / 127.5) - 1.0,  // R
              (pixel.g / 127.5) - 1.0,  // G
              (pixel.b / 127.5) - 1.0   // B
            ];
          },
        ),
      ),
    );
    return convertedBytes;
  }
}
```

### Next Steps in Flutter:
1. Trigger `FruitClassifier().loadModel()` early in the initialization of your `StatefulWidget`.
2. Connect an `ElevatedButton` to trigger the **Image Picker**.
3. Pass the resulting `XFile`/`File` to `predictFruit()` and update your UI state (`setState`) with the resulting detection text.
