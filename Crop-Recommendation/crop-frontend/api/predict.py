"""
Vercel Python Serverless Function — Crop Recommendation Inference
POST /api/predict
"""

import json
import os
import numpy as np

from http.server import BaseHTTPRequestHandler

# ─── Model loading (cached across warm invocations) ──────────────────────────
_model   = None
_encoder = None


def _load():
    global _model, _encoder
    if _model is not None:
        return

    import joblib

    base = os.path.join(os.path.dirname(__file__), "..", "models")
    _model   = joblib.load(os.path.join(base, "crop_recommendation_rf_model.pkl"))
    _encoder = joblib.load(os.path.join(base, "target_encoder.pkl"))


# ─── Feature engineering (mirrors the notebook exactly) ──────────────────────
def _build_features(N, P, K, temperature, humidity, ph, rainfall):
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

    # Feature order must match X columns in the notebook:
    # N, P, K, temperature, humidity, ph, rainfall, NPK_mean, THI, ph_category, rainfall_level
    return [N, P, K, temperature, humidity, ph, rainfall,
            NPK_mean, THI, ph_cat, rain_lvl]


# ─── CORS helper ─────────────────────────────────────────────────────────────
CORS_HEADERS = {
    "Access-Control-Allow-Origin":  "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type":                 "application/json",
}


class handler(BaseHTTPRequestHandler):
    def _send(self, status: int, body: dict):
        payload = json.dumps(body).encode()
        self.send_response(status)
        for k, v in CORS_HEADERS.items():
            self.send_header(k, v)
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    # ── Preflight ──
    def do_OPTIONS(self):
        self.send_response(204)
        for k, v in CORS_HEADERS.items():
            self.send_header(k, v)
        self.end_headers()

    # ── Main prediction ──
    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", 0))
            body   = json.loads(self.rfile.read(length))

            required = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
            for field in required:
                if field not in body:
                    return self._send(400, {"error": f"Missing field: {field}"})

            N           = float(body["N"])
            P           = float(body["P"])
            K           = float(body["K"])
            temperature = float(body["temperature"])
            humidity    = float(body["humidity"])
            ph          = float(body["ph"])
            rainfall    = float(body["rainfall"])

            _load()

            feats = _build_features(N, P, K, temperature, humidity, ph, rainfall)
            X     = np.array(feats, dtype=np.float64).reshape(1, -1)

            pred       = _model.predict(X)[0]
            proba      = _model.predict_proba(X)[0]
            confidence = float(round(proba.max() * 100, 2))
            crop       = str(_encoder.inverse_transform([pred])[0])

            self._send(200, {"crop": crop, "confidence": confidence})

        except (ValueError, TypeError) as exc:
            self._send(422, {"error": f"Invalid input: {exc}"})
        except Exception as exc:
            self._send(500, {"error": f"Inference error: {exc}"})

    def log_message(self, *args):
        pass   # Suppress default server logging in Vercel
