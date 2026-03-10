# ðŸŒ¾ CropWise â€” AI Crop Recommendation System

> **End-to-End Machine Learning Â· From Notebook to Production Web App**

[![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)](https://www.python.org/)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-1.8.0-orange?logo=scikit-learn)](https://scikit-learn.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## ðŸ“Œ Project Overview

CropWise is a full-stack AI application that helps farmers make data-driven decisions about which crop to grow based on soil nutrients and climate conditions.

**What's inside:**
- ðŸ”¬ **ML Notebook** â€” End-to-end data analysis, feature engineering, model training & evaluation
- âš¡ **FastAPI Backend** â€” Python REST API serving the trained Random Forest model locally  
- ðŸŒ **Next.js Frontend** â€” Beautiful, responsive TypeScript web app deployable on Vercel
- â˜ï¸ **Vercel Serverless** â€” Python inference function for zero-infrastructure cloud deployment

---

## ðŸ“ Project Structure

```
Crop-Recommendation/
â”œâ”€â”€ crop.ipynb                  # End-to-end ML notebook
â”œâ”€â”€ requirements.txt            # Notebook dependencies
â”œâ”€â”€ README.md
â”œâ”€â”€ Dataset/
â”‚   â””â”€â”€ Crop_recommendation.csv # Source dataset (2200 records, 22 crops)
â”œâ”€â”€ Models/
â”‚   â”œâ”€â”€ crop_recommendation_rf_model.pkl  # Trained Random Forest pipeline
â”‚   â””â”€â”€ target_encoder.pkl               # Label encoder for crop names
â””â”€â”€ crop-frontend/              # Full-stack web application
    â”œâ”€â”€ app/                    # Next.js 14 App Router (TypeScript)
    â”œâ”€â”€ components/             # UI components (Navbar, HeroSection, CropForm, ResultCardâ€¦)
    â”œâ”€â”€ lib/                    # Types & crop info data
    â”œâ”€â”€ api/
    â”‚   â””â”€â”€ predict.py          # Vercel Python serverless function
    â”œâ”€â”€ backend/
    â”‚   â”œâ”€â”€ main.py             # FastAPI server (local dev)
    â”‚   â””â”€â”€ requirements.txt    # FastAPI + ML dependencies
    â””â”€â”€ models/                 # Copy .pkl files here for deployment
```

---

## ðŸ§¬ Dataset Features

| Feature | Description | Range |
|---|---|---|
| **N** | Nitrogen content in soil (kg/ha) | 0 â€“ 140 |
| **P** | Phosphorous content in soil (kg/ha) | 5 â€“ 145 |
| **K** | Potassium content in soil (kg/ha) | 5 â€“ 205 |
| **Temperature** | Temperature (Â°C) | 8 â€“ 44 |
| **Humidity** | Relative humidity (%) | 14 â€“ 100 |
| **pH** | Soil pH value | 3.5 â€“ 10 |
| **Rainfall** | Rainfall (mm) | 20 â€“ 300 |
| **Label** | Target crop (22 classes) | â€” |

**Source:** [Kaggle â€” Crop Recommendation Dataset by Atharva Ingle](https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset)

---

## ðŸ¤– Models Trained

| Model | Accuracy |
|---|---|
| **Random Forest** âœ… *(deployed)* | **99.5%** |
| XGBoost | 99.3% |
| LightGBM | 98.8% |
| CatBoost | 98.6% |
| SVM | 97.5% |
| Logistic Regression | 95.2% |

> **Feature Engineering:** NPK mean, Temperatureâ€“Humidity Index (THI), pH category, Rainfall level â€” engineered features that boost model performance.

---

## ðŸ› ï¸ Tech Stack

| Layer | Technology |
|---|---|
| Data & ML | Python Â· pandas Â· scikit-learn Â· XGBoost Â· LightGBM Â· CatBoost |
| Visualization | Matplotlib Â· Seaborn Â· Plotly |
| Backend API | FastAPI Â· Uvicorn Â· Joblib |
| Frontend | Next.js 14 Â· TypeScript Â· Tailwind CSS Â· Framer Motion |
| Deployment | Vercel (Next.js + Python Serverless) |

---

## âš™ï¸ Setup & Running

### 1. Clone & install notebook dependencies

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

# Copy trained models first
cp ../Models/crop_recommendation_rf_model.pkl ../crop-frontend/models/
cp ../Models/target_encoder.pkl ../crop-frontend/models/

uvicorn main:app --reload --port 8000
```

API runs at **http://localhost:8000** Â· Swagger docs at **http://localhost:8000/docs**

### 3. Run the Next.js frontend

```bash
cd crop-frontend

# Point frontend to local backend
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

npm install
npm run dev
```

Open **http://localhost:3000**

---

## â˜ï¸ Deploy to Vercel

```bash
cd crop-frontend

# Remove local API URL so Vercel uses its own serverless function
# (comment out NEXT_PUBLIC_API_URL in .env.local)

npm install -g vercel
vercel
```

---

## ðŸ“Š Key Results

- **99.5% accuracy** â€” Random Forest on 22-class crop classification
- Top predictors: **Rainfall**, **Humidity**, **K (Potassium)**
- Engineered features (NPK_mean, THI) improve boundary separation between similar crops

---

## ðŸ‘¤ Author

**Sajjad Ali Shah**
- LinkedIn: [sajjad-ali-shah47](https://www.linkedin.com/in/sajjad-ali-shah47/)
- Dataset: [Kaggle â€” Crop Recommendation](https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset)

---

## ðŸ“„ License

MIT License
