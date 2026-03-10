import { Leaf, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="about"
      className="bg-gradient-to-br from-brand-950 to-brand-900 text-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-600 shadow-lg">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight">
                Crop<span className="text-brand-400">Wise</span>
              </span>
            </div>
            <p className="text-green-300 text-sm leading-relaxed max-w-xs">
              An AI-powered precision agriculture tool built with Next.js, TypeScript,
              and a Random Forest model trained on real Indian agricultural data.
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-brand-400 mb-4">
              Tech Stack
            </h4>
            <ul className="space-y-2 text-sm text-green-300">
              {[
                ["🐍", "Python · scikit-learn · Random Forest"],
                ["⚡", "Next.js 14 · App Router"],
                ["🔷", "TypeScript · React 18"],
                ["🎨", "Tailwind CSS · Framer Motion"],
                ["▲",  "Vercel Deployment"],
              ].map(([icon, text]) => (
                <li key={text} className="flex items-center gap-2">
                  <span>{icon}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Author */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-brand-400 mb-4">
              Author
            </h4>
            <p className="text-green-200 font-semibold text-lg mb-1">Sajjad Ali Shah</p>
            <p className="text-green-400 text-sm mb-5">ML Engineer · Data Scientist</p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/sajjad-ali-shah/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#0a66c2] hover:bg-[#0956a8] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href="https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-xl border border-white/20 transition-colors"
              >
                📦 Dataset
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-green-400">
          <p>© 2024 CropWise · Sajjad Ali Shah · All rights reserved.</p>
          <p className="text-green-500 text-xs">
            Dataset: Crop Recommendation Dataset · Atharva Ingle · Kaggle
          </p>
        </div>
      </div>
    </footer>
  );
}
