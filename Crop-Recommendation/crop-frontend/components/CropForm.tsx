"use client";

import { useState, useCallback } from "react";
import type { FormValues, FieldConfig } from "@/lib/types";
import { Sprout, RotateCcw, Loader2 } from "lucide-react";
import clsx from "clsx";

const FIELDS: FieldConfig[] = [
  {
    key: "N",
    label: "Nitrogen (N)",
    icon: "🌿",
    unit: "kg/ha",
    min: 0,
    max: 140,
    step: 1,
    defaultVal: 50,
    description: "Ratio of Nitrogen content in soil",
    color: "text-green-700",
  },
  {
    key: "P",
    label: "Phosphorous (P)",
    icon: "⚗️",
    unit: "kg/ha",
    min: 5,
    max: 145,
    step: 1,
    defaultVal: 50,
    description: "Ratio of Phosphorous content in soil",
    color: "text-orange-600",
  },
  {
    key: "K",
    label: "Potassium (K)",
    icon: "🪨",
    unit: "kg/ha",
    min: 5,
    max: 205,
    step: 1,
    defaultVal: 50,
    description: "Ratio of Potassium content in soil",
    color: "text-purple-700",
  },
  {
    key: "temperature",
    label: "Temperature",
    icon: "🌡️",
    unit: "°C",
    min: 8,
    max: 44,
    step: 0.1,
    defaultVal: 25,
    description: "Ambient temperature in °C",
    color: "text-red-600",
  },
  {
    key: "humidity",
    label: "Humidity",
    icon: "💧",
    unit: "%",
    min: 14,
    max: 100,
    step: 0.1,
    defaultVal: 65,
    description: "Relative humidity percentage",
    color: "text-blue-600",
  },
  {
    key: "ph",
    label: "Soil pH",
    icon: "🧪",
    unit: "pH",
    min: 3.5,
    max: 10,
    step: 0.1,
    defaultVal: 6.5,
    description: "pH value of the soil",
    color: "text-teal-600",
  },
  {
    key: "rainfall",
    label: "Rainfall",
    icon: "🌧️",
    unit: "mm",
    min: 20,
    max: 300,
    step: 1,
    defaultVal: 100,
    description: "Average annual rainfall in mm",
    color: "text-sky-600",
  },
];

const DEFAULTS: FormValues = FIELDS.reduce(
  (acc, f) => ({ ...acc, [f.key]: f.defaultVal }),
  {} as FormValues
);

function getPhLabel(ph: number) {
  if (ph < 5.5) return { label: "Acidic", color: "text-red-600 bg-red-50" };
  if (ph <= 7.5) return { label: "Neutral", color: "text-green-700 bg-green-50" };
  return { label: "Alkaline", color: "text-blue-700 bg-blue-50" };
}

interface SliderRowProps {
  field: FieldConfig;
  value: number;
  onChange: (key: keyof FormValues, v: number) => void;
}

function SliderRow({ field, value, onChange }: SliderRowProps) {
  const pct = ((value - field.min) / (field.max - field.min)) * 100;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 hover:border-brand-200 p-5 shadow-sm hover:shadow-card transition-all duration-200">
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{field.icon}</span>
          <div>
            <p className={`font-semibold text-sm ${field.color}`}>{field.label}</p>
            <p className="text-xs text-gray-400">{field.description}</p>
          </div>
        </div>
        {/* Value badge + direct number input */}
        <div className="flex items-center gap-1">
          <input
            type="number"
            min={field.min}
            max={field.max}
            step={field.step}
            value={value}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              if (!isNaN(v)) onChange(field.key, Math.min(field.max, Math.max(field.min, v)));
            }}
            className="w-20 text-right text-sm font-bold text-brand-800 bg-brand-50 border border-brand-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
          <span className="text-xs text-gray-400 font-medium">{field.unit}</span>
        </div>
      </div>

      {/* Slider */}
      <input
        type="range"
        min={field.min}
        max={field.max}
        step={field.step}
        value={value}
        style={{ "--range-progress": `${pct}%` } as React.CSSProperties}
        onChange={(e) => onChange(field.key, parseFloat(e.target.value))}
        className="w-full"
      />

      {/* Min / Max hints */}
      <div className="flex justify-between mt-1.5">
        <span className="text-[10px] text-gray-400">
          Min: {field.min} {field.unit}
        </span>
        {field.key === "ph" && (
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getPhLabel(value).color}`}
          >
            {getPhLabel(value).label}
          </span>
        )}
        <span className="text-[10px] text-gray-400">
          Max: {field.max} {field.unit}
        </span>
      </div>
    </div>
  );
}

interface CropFormProps {
  onSubmit: (values: FormValues) => void;
  loading: boolean;
}

export default function CropForm({ onSubmit, loading }: CropFormProps) {
  const [values, setValues] = useState<FormValues>(DEFAULTS);

  const handleChange = useCallback(
    (key: keyof FormValues, v: number) => setValues((prev) => ({ ...prev, [key]: v })),
    []
  );

  const handleReset = () => setValues(DEFAULTS);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <div className="bg-gradient-to-br from-brand-50 to-white rounded-3xl border border-brand-100 shadow-card p-8">
      {/* Card header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-700 shadow-lg shadow-brand-800/30">
          <Sprout className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-brand-950">Soil & Climate Parameters</h3>
          <p className="text-sm text-gray-500">
            Adjust the 7 sliders to match your field conditions
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* 2-col grid of sliders */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {FIELDS.map((field) => (
            <SliderRow
              key={field.key}
              field={field}
              value={values[field.key]}
              onChange={handleChange}
            />
          ))}
        </div>

        {/* Quick summary chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FIELDS.map((f) => (
            <span
              key={f.key}
              className="inline-flex items-center gap-1 bg-white border border-brand-200 text-brand-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm"
            >
              {f.icon} {f.key === "temperature" ? "Temp" : f.key === "humidity" ? "Hum." : f.key === "rainfall" ? "Rain" : f.key.toUpperCase()} :{" "}
              <span className="text-brand-600">
                {values[f.key].toFixed(f.step < 1 ? 1 : 0)} {f.unit}
              </span>
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className={clsx(
              "flex-1 flex items-center justify-center gap-2 font-bold text-base text-white py-4 rounded-2xl shadow-lg transition-all duration-200",
              loading
                ? "bg-brand-400 cursor-not-allowed"
                : "shimmer-btn hover:scale-[1.02] hover:shadow-xl shadow-brand-800/30 active:scale-95"
            )}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analysing…
              </>
            ) : (
              <>
                <Sprout className="w-5 h-5" />
                Get Crop Recommendation
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={loading}
            title="Reset to defaults"
            className="flex items-center justify-center px-4 rounded-2xl border-2 border-brand-200 text-brand-700 hover:bg-brand-50 hover:border-brand-400 transition-all duration-200 disabled:opacity-50"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
