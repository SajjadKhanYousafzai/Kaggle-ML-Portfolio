import streamlit as st
import pandas as pd
import numpy as np
import joblib
import os

# Page Configuration
st.set_page_config(page_title="Crop Recommendation System", page_icon="🌾", layout="centered")

# Custom CSS for beautiful UI
st.markdown("""
<style>
    .main {
        background-color: #f8f9fa;
    }
    div.stButton > button:first-child {
        background-color: #4CAF50;
        color: white;
        height: 50px;
        width: 100%;
        border-radius: 10px;
        font-size: 20px;
        font-weight: bold;
    }
    div.stButton > button:first-child:hover {
        background-color: #45a049;
    }
    .header-style {
        text-align: center;
        color: #2E7D32;
        font-family: 'Arial';
    }
</style>
""", unsafe_allow_html=True)

# Title and Description
st.markdown("<h1 class='header-style'>🌾 Crop Recommendation System 🚜</h1>", unsafe_allow_html=True)
st.markdown("<p style='text-align: center; color: #555;'>Enter the soil and weather parameters to find the most suitable crop to cultivate.</p>", unsafe_allow_html=True)

# Load Models
@st.cache_resource
def load_models():
    model_path = 'crop_recommendation_rf_model.pkl'
    encoder_path = 'target_encoder.pkl'
    
    if os.path.exists(model_path) and os.path.exists(encoder_path):
        model = joblib.load(model_path)
        encoder = joblib.load(encoder_path)
        return model, encoder
    else:
        return None, None

model, encoder = load_models()

if model is None:
    st.error("Model files not found! Please run the training script first.")
    st.stop()

# Input Forms
with st.form("crop_form"):
    st.subheader("🧪 Soil Parameters")
    col1, col2, col3 = st.columns(3)
    N = col1.number_input("Nitrogen (N) Ratio", min_value=0.0, max_value=200.0, value=90.0)
    P = col2.number_input("Phosphorous (P) Ratio", min_value=0.0, max_value=200.0, value=42.0)
    K = col3.number_input("Potassium (K) Ratio", min_value=0.0, max_value=250.0, value=43.0)
    
    st.subheader("🌤 Environmental Parameters")
    col4, col5 = st.columns(2)
    temperature = col4.number_input("Temperature (°C)", min_value=-10.0, max_value=60.0, value=20.8)
    humidity = col5.number_input("Relative Humidity (%)", min_value=0.0, max_value=100.0, value=82.0)
    
    col6, col7 = st.columns(2)
    ph = col6.number_input("Soil pH Value", min_value=0.0, max_value=14.0, value=6.5)
    rainfall = col7.number_input("Rainfall (mm)", min_value=0.0, max_value=400.0, value=202.9)
    
    submit_button = st.form_submit_button(label="Recommend Crop")

# Make Prediction
if submit_button:
    # Feature Engineering (Same logic as notebook)
    # 1. pH Category
    if ph < 5.5: ph_cat_text = 'Acidic'
    elif ph <= 7.5: ph_cat_text = 'Neutral'
    else: ph_cat_text = 'Alkaline'
    
    # 2. Rainfall Level
    if rainfall <= 50: rain_cat_text = 'Low'
    elif rainfall <= 100: rain_cat_text = 'Medium'
    elif rainfall <= 200: rain_cat_text = 'High'
    else: rain_cat_text = 'Very High'
    
    # Label Encoders (Hardcoded mapping from Data)
    ph_mapping = {'Acidic': 0, 'Alkaline': 1, 'Neutral': 2}
    rain_mapping = {'High': 0, 'Low': 1, 'Medium': 2, 'Very High': 3}
    
    ph_cat_enc = ph_mapping[ph_cat_text]
    rain_cat_enc = rain_mapping[rain_cat_text]
    
    # Create DataFrame for inference
    input_data = pd.DataFrame([[N, P, K, temperature, humidity, ph, rainfall, ph_cat_enc, rain_cat_enc]], 
                              columns=['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall', 'ph_category', 'rainfall_level'])
    
    # Predict
    prediction_raw = model.predict(input_data)
    recommended_crop = encoder.inverse_transform(prediction_raw)[0]
    
    st.success(f"### 🎉 The most suitable crop for your farm is: **{recommended_crop.upper()}**")
    
    st.balloons()
