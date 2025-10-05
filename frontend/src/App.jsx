import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Upload from "./pages/Upload"
import Compare from "./pages/Compare"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/compare" element={<Compare />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

