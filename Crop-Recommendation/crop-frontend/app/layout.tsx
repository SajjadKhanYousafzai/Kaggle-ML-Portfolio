import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "CropWise — AI Crop Recommendation System",
  description:
    "Get intelligent, data-driven crop recommendations based on your soil parameters and climate conditions using machine learning.",
  keywords:
    "crop recommendation, precision agriculture, machine learning, soil analysis, farming AI",
  authors: [{ name: "Sajjad Ali Shah" }],
  openGraph: {
    title: "CropWise — AI Crop Recommendation",
    description: "Enter your soil & climate data and get an ML-powered crop recommendation instantly.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
