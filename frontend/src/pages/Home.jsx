import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-gray-900 to-black opacity-70" />
        <div className="relative container mx-auto px-6 md:px-20 py-32 flex flex-col items-center justify-center text-center">
          {/* Glowing Background Orb */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />

          {/* Hero Text */}
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight relative">
            Summarize Research <br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
              Smarter. Faster. Better.
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            PaperSummarizer Pro helps you cut through the noise. Upload research
            papers and get accurate, AI-powered summaries instantly.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/upload"
              className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-lg text-lg font-semibold transition shadow-lg"
            >
              Get Started 🚀
            </Link>
            <a
              href="#features"
              className="border border-gray-500 hover:border-indigo-500 px-8 py-3 rounded-lg text-lg font-semibold transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-gray-800/50 backdrop-blur-md relative z-10"
      >
        <div className="container mx-auto px-6 md:px-20">
          <h2 className="text-4xl font-bold text-center mb-14">
            Why PaperSummarizer Pro?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition">
              <h3 className="text-2xl font-semibold mb-4">⚡ Instant Summaries</h3>
              <p className="text-gray-400">
                Upload a PDF and get results within seconds. Speed + Accuracy
                combined.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition">
              <h3 className="text-2xl font-semibold mb-4">🤖 AI Precision</h3>
              <p className="text-gray-400">
                Powered by advanced LLMs ensuring concise, reliable, and
                human-like summaries.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition">
              <h3 className="text-2xl font-semibold mb-4">🎯 Boost Productivity</h3>
              <p className="text-gray-400">
                Focus only on what matters. Cut through long papers and extract
                key insights instantly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

