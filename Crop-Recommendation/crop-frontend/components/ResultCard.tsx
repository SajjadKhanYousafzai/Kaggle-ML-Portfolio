"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PredictionResult } from "@/lib/types";
import { getCropData } from "@/lib/cropInfo";
import { CheckCircle2, Droplets, Thermometer, Info, Lightbulb, BarChart2, Share2, RefreshCcw } from "lucide-react";
import clsx from "clsx";

type Tab = "overview" | "tips" | "conditions";

function ConfidenceBadge({ pct }: { pct: number }) {
  const cls =
    pct >= 85 ? "conf-high" : pct >= 60 ? "conf-medium" : "conf-low";
  const label = pct >= 85 ? "High Confidence" : pct >= 60 ? "Moderate" : "Low Confidence";
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full border ${cls}`}>
      <CheckCircle2 className="w-4 h-4" />
      {label} · {pct.toFixed(1)}%
    </span>
  );
}

function ProgressBar({ value }: { value: number }) {
  const color = value >= 85 ? "bg-brand-500" : value >= 60 ? "bg-yellow-400" : "bg-red-400";
  return (
    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden mt-1 mb-4">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

const WATER_ICONS: Record<string, string> = {
  Low: "💧",
  Medium: "💧💧",
  High: "💧💧💧",
  "Very High": "💧💧💧💧",
};

interface ResultCardProps {
  result: PredictionResult;
  onReset?: () => void;
}

export default function ResultCard({ result, onReset }: ResultCardProps) {
  const [tab, setTab] = useState<Tab>("overview");
  const [copied, setCopied] = useState(false);

  const crop     = getCropData(result.crop);
  const conf     = Math.round(result.confidence * 10) / 10;

  const handleShare = async () => {
    const text = `🌾 CropWise recommends: ${crop.displayName} (${conf}% confidence) for your soil & climate conditions.`;
    if (navigator.share) {
      await navigator.share({ title: "CropWise Recommendation", text });
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const TABS: { id: Tab; icon: React.ReactNode; label: string }[] = [
    { id: "overview",    icon: <Info className="w-4 h-4" />,        label: "Overview" },
    { id: "tips",        icon: <Lightbulb className="w-4 h-4" />,   label: "Growing Tips" },
    { id: "conditions",  icon: <BarChart2 className="w-4 h-4" />,   label: "Ideal Conditions" },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 26 }}
        className="rounded-3xl overflow-hidden shadow-result border border-brand-100"
      >
        {/* ── Top hero strip ── */}
        <div className={`bg-gradient-to-br ${crop.bgColor} px-8 pt-8 pb-6`}>
          <div className="flex items-start justify-between gap-4">
            {/* Emoji + names */}
            <div className="flex items-center gap-5">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.15 }}
                className="flex items-center justify-center w-24 h-24 rounded-3xl bg-white shadow-xl text-5xl select-none"
              >
                {crop.emoji}
              </motion.div>
              <div>
                <span
                  className={`inline-block text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2 ${crop.badgeColor}`}
                >
                  {crop.category}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                  {crop.displayName}
                </h2>
                <p className="text-gray-500 text-sm mt-0.5">{crop.season}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2 min-w-max">
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 px-3 py-2 rounded-xl transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                {copied ? "Copied!" : "Share"}
              </button>
              {onReset && (
                <button
                  onClick={onReset}
                  className="flex items-center gap-1.5 text-xs font-semibold text-brand-700 border border-brand-200 bg-brand-50 hover:bg-brand-100 px-3 py-2 rounded-xl transition-colors"
                >
                  <RefreshCcw className="w-3.5 h-3.5" />
                  New
                </button>
              )}
            </div>
          </div>

          {/* Confidence */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Model Confidence
              </span>
              <ConfidenceBadge pct={conf} />
            </div>
            <ProgressBar value={conf} />
          </div>

          {/* Quick stats chips */}
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 bg-white/70 border border-white/80 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              <Droplets className="w-3.5 h-3.5 text-blue-500" />
              Water: {WATER_ICONS[crop.waterNeeds]} {crop.waterNeeds}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/70 border border-white/80 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              <Thermometer className="w-3.5 h-3.5 text-red-500" />
              {crop.season}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/70 border border-white/80 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              🌍 {crop.soilType}
            </span>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="bg-white border-b border-gray-100 px-8">
          <div className="flex gap-6">
            {TABS.map(({ id, icon, label }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={clsx(
                  "tab-btn flex items-center gap-1.5 text-sm font-semibold py-4 text-gray-400 hover:text-gray-700 transition-colors",
                  tab === id && "active"
                )}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab panels ── */}
        <div className="bg-white px-8 py-7 min-h-[220px]">
          <AnimatePresence mode="wait">
            {tab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-gray-700 leading-relaxed mb-5">{crop.description}</p>
                <div className="bg-brand-50 rounded-2xl border border-brand-100 p-4">
                  <p className="text-xs font-bold text-brand-700 uppercase tracking-wide mb-1.5">
                    💡 Did You Know?
                  </p>
                  <p className="text-sm text-brand-900 leading-relaxed">{crop.funFact}</p>
                </div>
              </motion.div>
            )}

            {tab === "tips" && (
              <motion.div
                key="tips"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="font-bold text-gray-800 mb-4">
                  5 Essential Growing Tips
                </h4>
                <ul className="space-y-3">
                  {crop.tips.map((tip, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-3"
                    >
                      <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-brand-100 text-brand-700 text-xs font-bold mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {tab === "conditions" && (
              <motion.div
                key="conditions"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="font-bold text-gray-800 mb-4">Ideal Growing Conditions</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { icon: "🌿", label: "Nitrogen (N)", value: "60–100 kg/ha" },
                    { icon: "⚗️", label: "Phosphorous (P)", value: "30–60 kg/ha" },
                    { icon: "🪨", label: "Potassium (K)", value: "40–80 kg/ha" },
                    { icon: "🌡️", label: "Temperature", value: "20–35 °C" },
                    { icon: "💧", label: "Humidity", value: "50–90 %" },
                    { icon: "🧪", label: "Soil pH", value: "5.5–7.5" },
                    { icon: "🌧️", label: "Rainfall", value: "80–250 mm" },
                  ].map(({ icon, label, value }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100"
                    >
                      <span className="text-xl">{icon}</span>
                      <div>
                        <p className="text-xs text-gray-400 font-medium">{label}</p>
                        <p className="text-sm font-bold text-gray-800">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
