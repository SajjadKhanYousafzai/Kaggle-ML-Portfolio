"""
CropWise — FastAPI Backend
Runs locally with: uvicorn main:app --reload --port 8000
"""

import os
import numpy as np
import joblib
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# ─── App setup ───────────────────────────────────────────────────────────────
app = FastAPI(
    title="CropWise API",
    description="AI-powered crop recommendation using Random Forest",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # lock down to your domain in production
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["*"],
)

# ─── Model loading (cached at startup) ───────────────────────────────────────
MODELS_DIR = os.path.join(os.path.dirname(__file__), "..", "models")

_model   = None
_encoder = None


def load_models():
    global _model, _encoder
    model_path   = os.path.join(MODELS_DIR, "crop_recommendation_rf_model.pkl")
    encoder_path = os.path.join(MODELS_DIR, "target_encoder.pkl")

    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model not found: {model_path}")
    if not os.path.exists(encoder_path):
        raise FileNotFoundError(f"Encoder not found: {encoder_path}")

    _model   = joblib.load(model_path)
    _encoder = joblib.load(encoder_path)
    print("✅ Models loaded successfully")


@app.on_event("startup")
def on_startup():
    load_models()


# ─── Schemas ─────────────────────────────────────────────────────────────────
class PredictRequest(BaseModel):
    N:           float = Field(..., ge=0,   le=140, description="Nitrogen (kg/ha)")
    P:           float = Field(..., ge=5,   le=145, description="Phosphorus (kg/ha)")
    K:           float = Field(..., ge=5,   le=205, description="Potassium (kg/ha)")
    temperature: float = Field(..., ge=8,   le=44,  description="Temperature (°C)")
    humidity:    float = Field(..., ge=14,  le=100, description="Relative Humidity (%)")
    ph:          float = Field(..., ge=3.5, le=10,  description="Soil pH")
    rainfall:    float = Field(..., ge=20,  le=300, description="Rainfall (mm)")


class PredictResponse(BaseModel):
    crop:       str
    confidence: float


# ─── Feature engineering (mirrors the notebook exactly) ──────────────────────
def build_features(N, P, K, temperature, humidity, ph, rainfall):
    NPK_mean = (N + P + K) / 3.0
    THI      = (temperature * humidity) / 100.0

    # ph_category — LabelEncoder sorts alphabetically:
    #   Acidic=0  Alkaline=1  Neutral=2
    if ph < 5.5:
        ph_cat = 0   # Acidic
    elif ph <= 7.5:
        ph_cat = 2   # Neutral
    else:
        ph_cat = 1   # Alkaline

    # rainfall_level — LabelEncoder sorts alphabetically:
    #   High=0  Low=1  Medium=2  Very High=3
    if rainfall <= 50:
        rain_lvl = 1   # Low
    elif rainfall <= 100:
        rain_lvl = 2   # Medium
    elif rainfall <= 200:
        rain_lvl = 0   # High
    else:
        rain_lvl = 3   # Very High

    # Feature order must match X columns in the notebook
    return [N, P, K, temperature, humidity, ph, rainfall,
            NPK_mean, THI, ph_cat, rain_lvl]


# ─── Routes ──────────────────────────────────────────────────────────────────
@app.get("/", tags=["Health"])
def root():
    return {"status": "ok", "message": "CropWise API is running 🌾"}


@app.get("/health", tags=["Health"])
def health():
    return {
        "status":        "ok",
        "model_loaded":  _model is not None,
        "encoder_loaded": _encoder is not None,
    }


@app.post("/api/predict", response_model=PredictResponse, tags=["Prediction"])
def predict(req: PredictRequest):
    if _model is None or _encoder is None:
        raise HTTPException(status_code=503, detail="Models not loaded")

    try:
        feats = build_features(
            req.N, req.P, req.K,
            req.temperature, req.humidity,
            req.ph, req.rainfall,
        )
        X          = np.array(feats, dtype=np.float64).reshape(1, -1)
        pred       = _model.predict(X)[0]
        proba      = _model.predict_proba(X)[0]
        confidence = float(round(proba.max() * 100, 2))
        crop       = str(_encoder.inverse_transform([pred])[0])

        return PredictResponse(crop=crop, confidence=confidence)

    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Inference error: {exc}")
