import { useState } from "react"
import axios from "axios"
import { Dialog } from "@headlessui/react"

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
      setIsOpen(true) // open modal
    } catch (err) {
      console.error(err)
      alert("Summarization failed!")
    } finally {
      setSummarizing(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg">
      <input type="file" accept="application/pdf" onChange={handleFileChange} className="w-full mb-4" />
      <button
        onClick={handleUpload}
        className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-black font-bold mb-4"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {preview && (
        <div className="mt-4 p-4 bg-gray-700 rounded-lg text-gray-100">
          <h3 className="font-bold mb-2">Preview:</h3>
          <p>{preview}</p>

          <button
            onClick={handleSummarize}
            className="mt-4 w-full py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg font-bold"
          >
            {summarizing ? "Summarizing..." : "Summarize"}
          </button>
        </div>
      )}

      {/* Modal for Summary */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <Dialog.Panel className="w-full max-w-2xl bg-gray-900 rounded-lg p-6 text-white shadow-xl">
            <Dialog.Title className="text-xl font-bold mb-4">Summary</Dialog.Title>
            <div className="max-h-[60vh] overflow-y-auto text-gray-300 whitespace-pre-line">
              {summary}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-bold"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}

export default PdfUpload

