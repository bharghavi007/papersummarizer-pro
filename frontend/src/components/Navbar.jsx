function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">PaperSummarizer Pro 📝</h1>
      <div className="space-x-4">
        <a href="#" className="hover:text-yellow-400">Home</a>
        <a href="#" className="hover:text-yellow-400">Upload</a>
        <a href="#" className="hover:text-yellow-400">About</a>
      </div>
    </nav>
  )
}

export default Navbar

