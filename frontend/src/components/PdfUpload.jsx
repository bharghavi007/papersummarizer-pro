import { useState } from "react"
import axios from "axios"
import { Dialog } from "@headlessui/react"
import { Upload as UploadIcon, Loader2, FileText } from "lucide-react"

function PdfUpload() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState("")
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)
  const [summarizing, setSummarizing] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setPreview("")
    setSummary("")
  }

  const handleUpload = async () => {
    if (!file) return alert("Select a PDF first!")

    const formData = new FormData()
    formData.append("file", file)

    try {
      setLoading(true)
      const res = await axios.post("http://localhost:8000/upload-pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setPreview(res.data.extracted_text_preview)
    } catch (err) {
      console.error(err)
      alert("Upload failed!")
    } finally {
      setLoading(false)
    }
  }

  const handleSummarize = async () => {
    if (!preview) return alert("No text to summarize!")

    try {
      setSummarizing(true)
      const res = await axios.post("http://localhost:8000/summarize", { text: preview })
      setSummary(res.data.summary)
      setIsOpen(true)
    } catch (err) {
      console.error(err)
      alert("Summarization failed!")
    } finally {
      setSummarizing(false)
    }
  }

  return (
    <div className="w-full bg-gray-800/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl transition-all duration-300 hover:shadow-indigo-600/30">
      {/* Upload Box */}
      <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-2xl py-10 bg-gray-900/50 hover:border-indigo-400 hover:bg-gray-800/60 transition-all duration-300">
        <UploadIcon className="w-10 h-10 text-indigo-400 mb-3" />
        <span className="text-gray-300 font-medium">
          {file ? file.name : "Click to choose your PDF file"}
        </span>
        <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
      </label>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-6 w-full flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UploadIcon className="w-5 h-5" />}
        {loading ? "Uploading..." : "Upload PDF"}
      </button>

      {/* Preview Section */}
      {preview && (
        <div className="mt-8 bg-gray-900/60 p-6 rounded-2xl border border-gray-700 text-gray-300">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h3 className="font-semibold text-indigo-300">Extracted Preview</h3>
          </div>
          <p className="text-sm text-gray-400 whitespace-pre-line max-h-48 overflow-y-auto">
            {preview}
          </p>

          {/* Summarize Button */}
          <button
            onClick={handleSummarize}
            disabled={summarizing}
            className="mt-6 w-full flex justify-center items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50"
          >
            {summarizing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Summarizing...
              </>
            ) : (
              <>
                <SparklesIcon /> Summarize with AI
              </>
            )}
          </button>
        </div>
      )}

      {/* Summary Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <Dialog.Panel className="bg-gray-900 text-white rounded-2xl max-w-3xl w-full p-8 shadow-2xl">
            <Dialog.Title className="text-2xl font-bold text-indigo-400 mb-4">
              🧠 AI Summary
            </Dialog.Title>
            <div className="max-h-[65vh] overflow-y-auto text-gray-300 whitespace-pre-line leading-relaxed">
              {summary}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-semibold transition-all"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}

function SparklesIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-yellow-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 3v4m0 10v4m9-9h-4m-10 0H3m6.364-5.636l-2.828 2.828m11.314 0-2.828-2.828m0 11.314 2.828-2.828m-11.314 0 2.828 2.828"
      />
    </svg>
  )
}

export default PdfUpload

