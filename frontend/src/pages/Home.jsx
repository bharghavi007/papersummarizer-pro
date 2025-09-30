import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-20">
      <h1 className="text-5xl font-bold mb-6">
        Welcome to <span className="text-blue-400">PaperSummarizer Pro 🚀</span>
      </h1>
      <p className="text-lg text-gray-300 max-w-2xl mb-10">
        Upload your research papers and get instant, concise summaries.  
        Simplify your learning and save hours of reading!
      </p>
      <Link
        to="/upload"
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-lg font-semibold shadow-lg transition"
      >
        Get Started
      </Link>
    </div>
  )
}

export default Home
