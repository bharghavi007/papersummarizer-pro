import { Link, useLocation } from "react-router-dom"
import { useState } from "react"

function Navbar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const linkClasses = (path) =>
    `block px-4 py-2 rounded-md transition-colors duration-300 ${
      location.pathname === path
        ? "text-blue-400 font-semibold bg-gray-800"
        : "text-gray-300 hover:text-blue-400"
    }`

  return (
    <nav className="bg-gray-900/90 backdrop-blur-md px-6 md:px-12 py-4 shadow-lg sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Brand */}
        <h1 className="text-2xl font-extrabold text-blue-400 tracking-wide">
          PaperSummarizer Pro
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-lg">
          <Link to="/" className={linkClasses("/")}>
            Home
          </Link>
          <Link to="/upload" className={linkClasses("/upload")}>
            Upload
          </Link>
          <Link to="/compare" className={linkClasses("/compare")}>
            Compare
        </Link>
        </div>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300 hover:text-blue-400 focus:outline-none"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="mt-4 md:hidden space-y-2">
          <Link
            to="/"
            className={linkClasses("/")}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/upload"
            className={linkClasses("/upload")}
            onClick={() => setIsOpen(false)}
          >
            Upload
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar

