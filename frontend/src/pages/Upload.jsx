import PdfUpload from "../components/PdfUpload"

function Upload() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-center mt-6 mb-4">
        Upload Your Paper 📄
      </h2>
      <p className="text-center text-gray-300 mb-8">
        Get AI-powered summaries in seconds.
      </p>
      <PdfUpload />
    </div>
  )
}

export default Upload
