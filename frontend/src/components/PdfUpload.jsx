import { useState } from "react"
import axios from "axios"

function PdfUpload() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState("")
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)
  const [summarizing, setSummarizing] = useState(false)

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

      {summary && (
        <div className="mt-4 p-4 bg-gray-700 rounded-lg text-gray-100">
          <h3 className="font-bold mb-2">Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  )
}

export default PdfUpload

