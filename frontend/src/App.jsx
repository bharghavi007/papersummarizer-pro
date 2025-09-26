import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="p-6">
        <h2 className="text-3xl font-semibold text-center mt-10">
          Welcome to PaperSummarizer Pro 🚀
        </h2>
        <p className="text-center mt-4 text-gray-300">
          Upload your research papers and get instant, concise summaries.
        </p>
      </main>
    </div>
  )
}

export default App


