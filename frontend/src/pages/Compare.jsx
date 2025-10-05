import { useState } from "react"
import axios from "axios"

export default function Compare() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")

  const onFilesChange = (e) => {
    setFiles(Array.from(e.target.files))
    setResult(null)
    setError("")
  }

  const handleCompare = async () => {
    setError("")
    setResult(null)
    if (!files || files.length < 2) {
      setError("Select at least 2 PDF files.")
      return
    }
    if (files.length > 6) {
      setError("Maximum 6 files allowed.")
      return
    }

    const formData = new FormData()
    files.forEach((f) => formData.append("files", f))

    try {
      setLoading(true)
      const res = await axios.post("http://localhost:8000/compare-multi", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 120000,
      })
      setResult(res.data.result)
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.detail || err.message || "Comparison failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      {/* LOADING OVERLAY */}
      {loading && (
        <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50 backdrop-blur-md">
          <div className="w-16 h-16 border-4 border-t-indigo-500 border-gray-600 rounded-full animate-spin mb-6"></div>
          <p className="text-lg font-semibold text-gray-200 animate-pulse">
            Analyzing papers... Please wait ⏳
          </p>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-gray-800/80 p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
          Multi-Paper Comparison
        </h2>
        <p className="text-gray-300 mb-6">
          Upload 2–6 research PDFs to compare similarities, differences, and research gaps.
        </p>

        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={onFilesChange}
          className="mb-4 block text-gray-300"
        />

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleCompare}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-md font-semibold transition-all duration-200 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Comparing..." : "Compare Papers"}
          </button>

          <div className="text-sm text-gray-400">
            {files.length > 0 ? `${files.length} file(s) selected` : "No files selected"}
          </div>
        </div>

        {error && <div className="mt-4 text-red-400">{error}</div>}

        {result && (
          <div className="mt-6 space-y-6 animate-fadeIn">
            {/* Similarities */}
            <section className="bg-gray-900 p-4 rounded-md">
              <h3 className="text-xl font-semibold mb-2 text-indigo-400">Key Similarities</h3>
              <ul className="list-disc pl-6 text-gray-300">
                {result.similarities?.length ? (
                  result.similarities.map((s, i) => <li key={i}>{s}</li>)
                ) : (
                  <li>No similarities identified.</li>
                )}
              </ul>
            </section>

            {/* Differences */}
            <section className="bg-gray-900 p-4 rounded-md">
              <h3 className="text-xl font-semibold mb-2 text-purple-400">Major Differences</h3>
              <ul className="list-disc pl-6 text-gray-300">
                {result.differences?.length ? (
                  result.differences.map((d, i) => <li key={i}>{d}</li>)
                ) : (
                  <li>No clear differences identified.</li>
                )}
              </ul>
            </section>

            {/* Per-Paper Summaries */}
            <section className="bg-gray-900 p-4 rounded-md">
              <h3 className="text-xl font-semibold mb-2 text-blue-400">Per-Paper Summaries</h3>
              <div className="space-y-4">
                {result.per_paper_summaries?.map((p, idx) => (
                  <div key={idx} className="p-3 bg-gray-800 rounded-md border border-gray-700">
                    <div className="font-semibold text-indigo-300">{p.filename}</div>
                    <div className="text-sm text-gray-300 mt-2 whitespace-pre-line">
                      {p.summary}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Overall Insight */}
            <section className="bg-gray-900 p-4 rounded-md">
              <h3 className="text-xl font-semibold mb-2 text-pink-400">
                Overall Insights & Research Gaps
              </h3>
              <ul className="list-disc pl-6 text-gray-300">
                {result.overall_insight?.length ? (
                  result.overall_insight.map((g, i) => <li key={i}>{g}</li>)
                ) : (
                  <li>No further insights generated.</li>
                )}
              </ul>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}

