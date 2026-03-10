"use client";

import { useEffect, useState } from "react";
import { Leaf, Menu, X } from "lucide-react";
import clsx from "clsx";

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Predict",      href: "#predict"      },
  { label: "About",        href: "#about"         },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "glass shadow-md shadow-green-900/10 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-700 shadow-lg shadow-brand-900/30 group-hover:scale-110 transition-transform duration-200">
            <Leaf className="w-5 h-5 text-white" />
          </span>
          <span
            className={clsx(
              "font-extrabold text-xl tracking-tight transition-colors",
              scrolled ? "text-brand-900" : "text-white"
            )}
          >
            Crop<span className="text-brand-400">Wise</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={clsx(
                "text-sm font-medium transition-colors duration-200 hover:text-brand-400",
                scrolled ? "text-brand-800" : "text-green-100"
              )}
            >
              {label}
            </a>
          ))}
          <a
            href="#predict"
            className="ml-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md shadow-brand-800/30 transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            Get Started →
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={clsx(
            "md:hidden p-2 rounded-lg transition-colors",
            scrolled ? "text-brand-800 hover:bg-brand-100" : "text-white hover:bg-white/10"
          )}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-green-200/40 px-4 pt-3 pb-5 flex flex-col gap-3">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-brand-800 font-medium text-sm py-2 px-3 rounded-lg hover:bg-brand-100 transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href="#predict"
            onClick={() => setMenuOpen(false)}
            className="text-center bg-brand-700 text-white font-semibold py-2 rounded-full mt-1"
          >
            Get Started →
          </a>
        </div>
      )}
    </header>
  );
}
