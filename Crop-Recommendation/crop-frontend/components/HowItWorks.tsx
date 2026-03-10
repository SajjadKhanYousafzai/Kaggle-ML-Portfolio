const STEPS = [
  {
    number: "01",
    icon: "🧪",
    title: "Enter Soil Parameters",
    description:
      "Input your soil's Nitrogen (N), Phosphorous (P), Potassium (K), and pH level. Use a standard soil test kit for accurate readings.",
    color: "from-green-50 to-emerald-100",
    border: "border-green-200",
    numColor: "text-green-700",
  },
  {
    number: "02",
    icon: "🌦️",
    title: "Add Climate Data",
    description:
      "Provide your local temperature, relative humidity, and average annual rainfall. These climate inputs are critical for optimal recommendations.",
    color: "from-blue-50 to-cyan-100",
    border: "border-blue-200",
    numColor: "text-blue-700",
  },
  {
    number: "03",
    icon: "🤖",
    title: "AI Analyses & Recommends",
    description:
      "Our Random Forest model — trained on 2,200 samples with >99% accuracy — instantly processes your inputs and returns the best crop for your conditions.",
    color: "from-purple-50 to-violet-100",
    border: "border-purple-200",
    numColor: "text-purple-700",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 px-4 sm:px-6 bg-gradient-to-b from-brand-50 to-white"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-brand-700 text-sm font-semibold uppercase tracking-widest mb-3">
            Simple Process
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-brand-950 leading-tight mb-4">
            How It Works
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Three easy steps from field data to a precise, AI-driven crop suggestion.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map(({ number, icon, title, description, color, border, numColor }, i) => (
            <div
              key={i}
              className={`relative bg-gradient-to-br ${color} border ${border} rounded-3xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Number badge */}
              <span
                className={`absolute -top-4 -left-3 text-6xl font-black opacity-12 select-none pointer-events-none ${numColor}`}
                aria-hidden
              >
                {number}
              </span>

              {/* Icon circle */}
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-md text-3xl mb-6">
                {icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{description}</p>

              {/* Connector arrow (hidden on last item) */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-5 text-2xl text-gray-300 -translate-y-1/2">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
