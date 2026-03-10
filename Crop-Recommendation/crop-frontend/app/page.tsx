"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import CropForm from "@/components/CropForm";
import ResultCard from "@/components/ResultCard";
import Footer from "@/components/Footer";
import type { FormValues, PredictionResult } from "@/lib/types";
import { AlertTriangle, Sprout } from "lucide-react";

export default function HomePage() {
  const [result,  setResult]  = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  async function handlePredict(values: FormValues) {
    setLoading(true);
    setError(null);
    setResult(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/predict`
      : "/api/predict";

    try {
      const res = await fetch(apiUrl, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(values),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error ?? `Server error: ${res.status}`);
      }

      const data: PredictionResult = await res.json();
      setResult(data);

      // Smooth scroll to result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <HeroSection />

        {/* ── How It Works ── */}
        <HowItWorks />

        {/* ── Predict section ── */}
        <section
          id="predict"
          className="py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-brand-50"
        >
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-14">
              <span className="inline-block text-brand-700 text-sm font-semibold uppercase tracking-widest mb-3">
                ML-Powered Analysis
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-brand-950 leading-tight mb-4">
                Get Your Recommendation
              </h2>
              <p className="text-gray-500 text-lg max-w-xl mx-auto">
                Fine-tune the 7 parameters below and let our model determine the
                ideal crop for your specific conditions.
              </p>
            </div>

            {/* 2-column desktop grid */}
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              {/* Form */}
              <div>
                <CropForm onSubmit={handlePredict} loading={loading} />
              </div>

              {/* Result / placeholder */}
              <div ref={resultRef}>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-4 bg-red-50 border border-red-200 rounded-2xl p-6 text-red-700"
                  >
                    <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Something went wrong</p>
                      <p className="text-sm">{error}</p>
                    </div>
                  </motion.div>
                )}

                {!result && !error && !loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-brand-200 bg-brand-50/50 p-16 text-center min-h-[340px]"
                  >
                    <div className="w-20 h-20 rounded-3xl bg-brand-100 flex items-center justify-center mb-5 text-4xl">
                      🌱
                    </div>
                    <p className="text-xl font-bold text-brand-800 mb-2">
                      Your recommendation will appear here
                    </p>
                    <p className="text-sm text-gray-400 max-w-xs">
                      Adjust the sliders on the left and click{" "}
                      <strong>Get Crop Recommendation</strong> to proceed.
                    </p>
                  </motion.div>
                )}

                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-brand-300 bg-brand-50 p-16 text-center min-h-[340px]"
                  >
                    <div className="relative w-20 h-20 mb-6">
                      <div className="absolute inset-0 rounded-3xl bg-brand-200 animate-ping opacity-30" />
                      <div className="absolute inset-0 rounded-3xl bg-brand-100 flex items-center justify-center text-4xl">
                        🌿
                      </div>
                    </div>
                    <p className="text-lg font-bold text-brand-800 mb-2">
                      Analysing your parameters…
                    </p>
                    <p className="text-sm text-brand-500">
                      Our Random Forest model is computing the best crop for you.
                    </p>
                  </motion.div>
                )}

                {result && (
                  <ResultCard result={result} onReset={handleReset} />
                )}
              </div>
            </div>

            {/* Dataset note */}
            <p className="text-center text-xs text-gray-400 mt-10">
              Model trained on the{" "}
              <a
                href="https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-brand-500 hover:text-brand-700"
              >
                Crop Recommendation Dataset
              </a>{" "}
              by Atharva Ingle · Kaggle. For demonstration purposes.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
