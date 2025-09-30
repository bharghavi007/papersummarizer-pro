import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="bg-gray-800 px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold text-blue-400">PaperSummarizer Pro</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/upload" className="hover:text-blue-400">Upload</Link>
      </div>
    </nav>
  )
}

export default Navbar

