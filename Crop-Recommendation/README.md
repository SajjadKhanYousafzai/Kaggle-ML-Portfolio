# CropWise - AI Crop Recommendation System

> **End-to-End Machine Learning - From Notebook to Production Web App**

[![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)](https://www.python.org/)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-1.8.0-orange?logo=scikit-learn)](https://scikit-learn.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## Project Overview

CropWise is a full-stack AI application that helps farmers make data-driven decisions about which crop to grow based on soil nutrients and climate conditions.

**What is inside:**
- **ML Notebook** - End-to-end data analysis, feature engineering, model training and evaluation
- **FastAPI Backend** - Python REST API serving the trained Random Forest model locally
- **Next.js Frontend** - Beautiful, responsive TypeScript web app deployable on Vercel
- **Vercel Serverless** - Python inference function for zero-infrastructure cloud deployment

---

## Project Structure

```
Crop-Recommendation/
 crop.ipynb                  # End-to-end ML notebook
 requirements.txt            # Notebook dependencies
 README.md
 Dataset/
    Crop_recommendation.csv
 Models/
    crop_recommendation_rf_model.pkl
    target_encoder.pkl
 crop-frontend/
     app/                    # Next.js 14 App Router (TypeScript)
     components/             # Navbar, HeroSection, CropForm, ResultCard
     lib/                    # Types and crop info data
     api/
        predict.py          # Vercel Python serverless function
     backend/
        main.py             # FastAPI server (local dev)
        requirements.txt
     models/                 # Place .pkl files here
```

---

## Dataset Features

| Feature | Description | Range |
|---|---|---|
| N | Nitrogen content in soil (kg/ha) | 0 - 140 |
| P | Phosphorous content in soil (kg/ha) | 5 - 145 |
| K | Potassium content in soil (kg/ha) | 5 - 205 |
| Temperature | Temperature in Celsius | 8 - 44 |
| Humidity | Relative humidity (%) | 14 - 100 |
| pH | Soil pH value | 3.5 - 10 |
| Rainfall | Rainfall (mm) | 20 - 300 |
| Label | Target crop (22 classes) | - |

**Source:** [Kaggle - Crop Recommendation Dataset by Atharva Ingle](https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset)

---

## Models Trained

| Model | Accuracy |
|---|---|
| **Random Forest** (deployed) | **99.5%** |
| XGBoost | 99.3% |
| LightGBM | 98.8% |
| CatBoost | 98.6% |
| SVM | 97.5% |
| Logistic Regression | 95.2% |

> Feature Engineering: NPK mean, Temperature-Humidity Index (THI), pH category, Rainfall level.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Data and ML | Python, pandas, scikit-learn, XGBoost, LightGBM, CatBoost |
| Visualization | Matplotlib, Seaborn, Plotly |
| Backend API | FastAPI, Uvicorn, Joblib |
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Framer Motion |
| Deployment | Vercel (Next.js + Python Serverless) |

---

## Setup and Running

### 1. Install notebook dependencies

```bash
conda create -n ml_env python=3.11
conda activate ml_env
pip install -r requirements.txt
jupyter notebook crop.ipynb
```

### 2. Run the FastAPI backend

```bash
cd crop-frontend/backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API: http://localhost:8000 | Docs: http://localhost:8000/docs

### 3. Run the Next.js frontend

```bash
cd crop-frontend
npm install
npm run dev
```

Open http://localhost:3000

---

## Deploy to Vercel

```bash
cd crop-frontend
npm install -g vercel
vercel
```

---

## Key Results

- 99.5% accuracy with Random Forest on 22-class crop classification
- Top predictors: Rainfall, Humidity, K (Potassium)
- Engineered features (NPK_mean, THI) improve boundary separation between similar crops

---

## Author

**Sajjad Ali Shah**
- LinkedIn: [sajjad-ali-shah47](https://www.linkedin.com/in/sajjad-ali-shah47/)
- Dataset: [Kaggle - Crop Recommendation](https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset)

---

## License

MIT License
