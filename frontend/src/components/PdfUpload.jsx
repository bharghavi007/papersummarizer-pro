import { useState } from "react"

function PdfUpload() {
  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = () => {
    if (!file) {
      alert("Please select a PDF file first!")
      return
    }
    // Abhi sirf demo ke liye
    alert(`Selected file: ${file.name}`)
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
        Upload
      </button>
    </div>
  )
}

export default PdfUpload


