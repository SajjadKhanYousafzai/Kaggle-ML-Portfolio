# 🗑️♻️ Garbage Classification (EfficientNet-B3)

A deep learning project for **multi-class garbage image classification** using **PyTorch** and **transfer learning** with `efficientnet_b3`.

## Project Goal

Classify waste images into categories (e.g., battery, biological, cardboard, clothes, glass, metal, paper, plastic, shoes, trash) to support automated waste segregation.

## Highlights

- Transfer learning with `efficientnet_b3` (default backbone)
- Stratified train/val/test split
- Class-imbalance handling with `WeightedRandomSampler`
- Stage-1 training + Stage-2 fine-tuning
- Evaluation:
  - Accuracy
  - Precision / Recall / F1
  - Confusion Matrix
- Export artifacts for deployment:
  - `garbage_classifier_best.pt`
  - `garbage_classifier_scripted.pt`
  - `garbage_classifier.onnx` (optional)
  - `class_names.json`
  - `frontend_config.json`

## Dataset

Kaggle Dataset: **Garbage Classification V2**
https://www.kaggle.com/datasets/sumn2u/garbage-classification-v2

## Run (Kaggle)

1. Open the notebook `garbage-data.ipynb`.
2. Attach the dataset above.
3. Run all cells.
4. Check generated files in `./artifacts`.

## Run (Local)

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Open and run notebook:
   - `garbage-data.ipynb`

## Output Folder

`artifacts/` will contain model weights and metadata files for inference/frontend use.

## Author

**Sajjad Ali Shah**
ML Engineer & Data Scientist
