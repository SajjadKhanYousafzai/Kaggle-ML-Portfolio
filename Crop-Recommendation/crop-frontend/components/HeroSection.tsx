"use client";

import { ArrowDown } from "lucide-react";

const FLOATING_ITEMS = [
  { emoji: "🌾", size: "text-4xl", pos: "top-[15%] left-[8%]",  cls: "float-1" },
  { emoji: "🌽", size: "text-3xl", pos: "top-[25%] right-[10%]", cls: "float-2" },
  { emoji: "🍅", size: "text-2xl", pos: "top-[55%] left-[5%]",  cls: "float-3" },
  { emoji: "🥭", size: "text-3xl", pos: "top-[60%] right-[7%]", cls: "float-4" },
  { emoji: "🍇", size: "text-2xl", pos: "top-[38%] left-[3%]",  cls: "float-5" },
  { emoji: "☕", size: "text-xl",  pos: "top-[43%] right-[3%]", cls: "float-1" },
  { emoji: "🫘", size: "text-2xl", pos: "top-[80%] left-[12%]", cls: "float-2" },
  { emoji: "🥥", size: "text-2xl", pos: "top-[78%] right-[12%]",cls: "float-3" },
];

const STATS = [
  { value: "22",    label: "Crop Types" },
  { value: "2,200", label: "Training Records" },
  { value: ">99%",  label: "Model Accuracy" },
  { value: "7",     label: "Input Parameters" },
];

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden hero-pattern"
      style={{ background: "linear-gradient(135deg, #052e16 0%, #14532d 40%, #166534 70%, #15803d 100%)" }}
    >
      {/* Grid mesh overlay */}
      <div className="absolute inset-0 hero-mesh opacity-40 pointer-events-none" />

      {/* Radial glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating crop icons */}
      {FLOATING_ITEMS.map(({ emoji, size, pos, cls }, i) => (
        <span
          key={i}
          className={`absolute select-none pointer-events-none ${size} ${pos} ${cls} opacity-70`}
          aria-hidden="true"
        >
          {emoji}
        </span>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-24 pb-12">
        {/* Headline */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          Grow Smarter with{" "}
          <span className="gradient-text">AI-Powered</span>
          <br />
          Crop Advice
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl text-green-200 max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up"
          style={{ animationDelay: "0.35s", opacity: 0 }}
        >
          Enter your soil nutrients and climate data. Our machine-learning model
          instantly recommends the best crop to maximize your yield and profit.
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up"
          style={{ animationDelay: "0.5s", opacity: 0 }}
        >
          <a
            href="#predict"
            className="shimmer-btn text-white font-bold text-base px-8 py-4 rounded-full shadow-xl shadow-brand-950/40 hover:scale-105 transition-transform duration-200 w-full sm:w-auto text-center"
          >
            🌱 Get Your Recommendation
          </a>
          <a
            href="#how-it-works"
            className="glass text-white font-semibold text-base px-7 py-4 rounded-full hover:bg-white/20 transition-all duration-200 w-full sm:w-auto text-center border border-white/20"
          >
            How It Works →
          </a>
        </div>

        {/* Stats row */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 animate-fade-in-up"
          style={{ animationDelay: "0.65s", opacity: 0 }}
        >
          {STATS.map(({ value, label }) => (
            <div key={label} className="glass-dark rounded-2xl p-4 text-center">
              <p className="text-2xl sm:text-3xl font-extrabold gradient-text">{value}</p>
              <p className="text-green-300 text-xs sm:text-sm mt-1 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#how-it-works"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs font-medium tracking-widest uppercase opacity-70">Scroll</span>
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </a>
    </section>
  );
}
