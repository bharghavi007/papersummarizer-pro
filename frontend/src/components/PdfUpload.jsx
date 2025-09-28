
import { useState } from "react"
import axios from "axios"

function PdfUpload() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState("")
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file first!")
      return
    }

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

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Upload PDF</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="w-full text-gray-300 mb-4"
      />
      <button
        onClick={handleUpload}
        className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-black font-bold"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
      {preview && (
        <div className="mt-4 p-4 bg-gray-700 rounded-lg text-gray-100">
          <h3 className="font-bold mb-2">Preview:</h3>
          <p>{preview}</p>
        </div>
      )}
    </div>
  )
}

export default PdfUpload


