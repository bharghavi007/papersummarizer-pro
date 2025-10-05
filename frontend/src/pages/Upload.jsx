import { Upload as UploadIcon, Sparkles, ShieldCheck } from "lucide-react"
import PdfUpload from "../components/PdfUpload"

function Upload() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center px-6 py-16">
      
      {/* Header Section */}
      <header className="text-center max-w-3xl mb-14 animate-fadeIn">
        <h1 className="text-5xl font-extrabold mb-6 leading-tight tracking-tight">
          Upload Your{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
            Research Paper
          </span>
        </h1>
        <p className="text-lg text-gray-300">
          Get <span className="text-indigo-400 font-semibold">AI-powered</span> summaries in seconds.{" "}
          <span className="text-gray-400">Faster research, smarter results.</span>
        </p>
      </header>

      {/* Upload Card */}
      <div className="w-full max-w-3xl bg-gray-800/90 backdrop-blur-lg p-10 rounded-3xl shadow-[0_0_30px_rgba(99,102,241,0.15)] border border-gray-700 hover:shadow-[0_0_40px_rgba(99,102,241,0.25)] transition-all transform hover:scale-[1.02] duration-300">
        <div className="flex items-center justify-center mb-6">
        </div>
        <PdfUpload />
      </div>

      {/* Feature Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl text-center animate-fadeInSlow">
        <div className="p-6 bg-gray-800/70 rounded-2xl shadow-md border border-gray-700 hover:border-indigo-500/50 hover:shadow-indigo-500/20 transition-all duration-300">
          <Sparkles className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-2 text-indigo-300">Smart Summaries</h3>
          <p className="text-gray-400 text-sm">
            Extracts only the key insights and conclusions from long research papers.
          </p>
        </div>

        <div className="p-6 bg-gray-800/70 rounded-2xl shadow-md border border-gray-700 hover:border-indigo-500/50 hover:shadow-indigo-500/20 transition-all duration-300">
          <UploadIcon className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-2 text-indigo-300">Easy Upload</h3>
          <p className="text-gray-400 text-sm">
            Just drag & drop your PDFs or click to upload — no complex steps.
          </p>
        </div>

        <div className="p-6 bg-gray-800/70 rounded-2xl shadow-md border border-gray-700 hover:border-indigo-500/50 hover:shadow-indigo-500/20 transition-all duration-300">
          <ShieldCheck className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-2 text-indigo-300">Secure & Private</h3>
          <p className="text-gray-400 text-sm">
            Your documents are processed securely in real time — nothing is stored.
          </p>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="mt-14 text-gray-500 text-sm text-center animate-fadeInSlow">
        ⚡ Designed for researchers, students, and professionals.
      </footer>
    </div>
  )
}

export default Upload

