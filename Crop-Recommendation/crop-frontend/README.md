# 🌾 CropWise — AI Crop Recommendation Frontend

A beautiful, production-ready **Next.js 14 + TypeScript** web application that serves
ML-powered crop recommendations via a **Vercel Python Serverless** function.

---

## ✨ Features

- 🎨 **Professional UI** — glassmorphism hero, animated floating crop emojis, smooth tab transitions
- 🔢 **7-parameter form** — interactive sliders with real-time value display for N, P, K, Temperature, Humidity, pH, Rainfall
- 🤖 **ML Inference** — Random Forest model (>99% accuracy) served via a Vercel Python serverless function
- 📊 **Rich result card** — crop emoji, confidence bar, 3-tab panel (Overview / Growing Tips / Ideal Conditions)
- 🌐 **Vercel-ready** — one command deploy

---

## 🚀 Quick Start

### 1. Copy the trained models

```bash
cp ../Models/crop_recommendation_rf_model.pkl models/
cp ../Models/target_encoder.pkl               models/
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** The Python serverless function (`api/predict.py`) requires the Vercel CLI to run locally.
> For local testing of the API install the CLI: `npm i -g vercel` then run `vercel dev`.

---

## 🌐 Deploy to Vercel

```bash
# Install Vercel CLI (once)
npm i -g vercel

# Deploy
vercel
```

Vercel automatically:
- Builds the Next.js frontend
- Deploys `api/predict.py` as a Python 3.9 serverless function
- Serves both under the same domain

---

## 🗂 Project Structure

```
crop-frontend/
├── api/
│   └── predict.py          ← Python serverless — ML inference endpoint
├── app/
│   ├── layout.tsx           ← Root layout + metadata
│   ├── page.tsx             ← Main page (form + result)
│   └── globals.css          ← Global styles, slider CSS, animations
├── components/
│   ├── Navbar.tsx           ← Sticky, scroll-aware navigation
│   ├── HeroSection.tsx      ← Full-height animated hero
│   ├── HowItWorks.tsx       ← 3-step explainer section
│   ├── CropForm.tsx         ← 7-parameter slider form
│   ├── ResultCard.tsx       ← Animated prediction result with tabs
│   └── Footer.tsx           ← Author info, tech stack
├── lib/
│   ├── types.ts             ← TypeScript interfaces
│   └── cropInfo.ts          ← Crop descriptions, tips & growing info
├── models/
│   ├── crop_recommendation_rf_model.pkl   ← copy here
│   └── target_encoder.pkl                ← copy here
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── vercel.json              ← Python runtime config
└── requirements.txt         ← scikit-learn, numpy, joblib
```

---

## ⚙️ How the API Works

### `POST /api/predict`

**Request body:**
```json
{
  "N":           80,
  "P":           40,
  "K":           40,
  "temperature": 24.5,
  "humidity":    82.0,
  "ph":          6.2,
  "rainfall":    202.9
}
```

**Response:**
```json
{
  "crop":       "rice",
  "confidence": 98.6
}
```

The Python handler replicates the notebook's feature engineering exactly:
- Computes `NPK_mean`, `THI`
- Label-encodes `ph_category` and `rainfall_level` alphabetically (matching the trained encoder)
- Feeds all 11 features to the Random Forest pipeline

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Lucide React |
| ML Backend | Python · scikit-learn · Random Forest |
| Deployment | Vercel (Next.js + Python Serverless) |

---

## 📜 License

MIT © 2024 Sajjad Ali Shah
