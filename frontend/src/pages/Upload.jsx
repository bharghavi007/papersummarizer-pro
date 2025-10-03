import { Upload as UploadIcon, Sparkles, ShieldCheck } from "lucide-react"
import PdfUpload from "../components/PdfUpload"

function Upload() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center px-6 py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mb-14 animate-fadeIn">
        <h2 className="text-5xl font-extrabold mb-6 leading-tight">
          Upload Your <span className="text-indigo-400">Research Paper</span>
        </h2>
        <p className="text-lg text-gray-300">
          Get <span className="text-indigo-400 font-semibold">AI-powered</span>{" "}
          summaries in seconds. Faster research, smarter results.
        </p>
      </div>

      {/* Upload Section */}
      <div className="w-full max-w-3xl bg-gray-800/90 backdrop-blur-lg p-10 rounded-3xl shadow-xl hover:shadow-indigo-600/30 transition transform hover:scale-[1.01]">
        <div className="flex items-center justify-center mb-6">
          <UploadIcon className="w-10 h-10 text-indigo-400" />
        </div>
        <PdfUpload />
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl text-center">
        <div className="p-6 bg-gray-800/70 rounded-2xl shadow-md hover:shadow-indigo-500/20 transition">
          <Sparkles className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-2">Smart Summaries</h3>
          <p className="text-gray-400 text-sm">
            Extracts only the important insights from long research papers.
          </p>
        </div>
        <div className="p-6 bg-gray-800/70 rounded-2xl shadow-md hover:shadow-indigo-500/20 transition">
          <UploadIcon className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-2">Easy Upload</h3>
          <p className="text-gray-400 text-sm">
            Just drag & drop your PDF or click to upload. Hassle-free process.
          </p>
        </div>
        <div className="p-6 bg-gray-800/70 rounded-2xl shadow-md hover:shadow-indigo-500/20 transition">
          <ShieldCheck className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
          <p className="text-gray-400 text-sm">
            Your documents are processed securely — nothing is stored.
          </p>
        </div>
      </div>

      {/* Footer Note */}
      <p className="mt-14 text-gray-500 text-sm text-center">
        ⚡ Designed for researchers, students, and professionals.
      </p>
    </div>
  )
}

export default Upload

