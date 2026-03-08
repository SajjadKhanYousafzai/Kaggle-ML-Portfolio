import 'package:tflite_flutter/tflite_flutter.dart';
import 'package:flutter/services.dart';
import 'package:image/image.dart' as img;

class TFLiteService {
  Interpreter? _interpreter;
  List<String> _labels = [];

  bool get isModelLoaded => _interpreter != null;

  Future<void> loadModel() async {
    try {
      _interpreter = await Interpreter.fromAsset('assets/models/fruits_model.tflite');
      String loadedLabels = await rootBundle.loadString('assets/models/fruit_labels.txt');
      _labels = loadedLabels.split('\n').where((label) => label.isNotEmpty).toList();
      print('Model loaded successfully with ${_labels.length} classes.');
    } catch (e) {
      print('Failed to load model: $e');
    }
  }

  Map<String, dynamic>? detectFruit(img.Image decodedImage) {
    if (_interpreter == null) return null;

    try {
      // 1. Resize to 100x100 (Model Input requirement)
      img.Image resizedImage = img.copyResize(decodedImage, width: 100, height: 100);

      // 2. Preprocess to Float32 [-1, 1] bounds
      var input = List.generate(
        1, (i) => List.generate(
          100, (y) => List.generate(
            100, (x) {
              final pixel = resizedImage.getPixel(x, y);
              // Normalize RGB from 0-255 to -1 to 1 (MobileNetV2 standard)
              return [
                (pixel.r / 127.5) - 1.0, 
                (pixel.g / 127.5) - 1.0, 
                (pixel.b / 127.5) - 1.0
              ];
            }
          )
        )
      );

      // 3. Prepare Output Tensor [1, NUM_CLASSES]
      var output = List.filled(1 * _labels.length, 0.0).reshape([1, _labels.length]);

      // 4. Run inference
      _interpreter!.run(input, output);

      // 5. Find maximum probability
      List<double> probabilities = (output[0] as List).cast<double>();
      double maxProb = 0;
      int maxIndex = 0;

      for (int i = 0; i < probabilities.length; i++) {
        if (probabilities[i] > maxProb) {
          maxProb = probabilities[i];
          maxIndex = i;
        }
      }

      return {
        'label': _labels[maxIndex],
        'confidence': maxProb
      };
    } catch (e) {
      print('Inference error: $e');
      return null;
    }
  }

  void dispose() {
    _interpreter?.close();
  }
}
