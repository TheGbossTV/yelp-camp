import { Routes, Route } from "react-router-dom";

// Layout
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

// Pages
import HomePage from "./Pages/HomePage";
import Campgrounds from "./Pages/Campgrounds";
import RegisterPage from "./Pages/RegisterPage";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/campgrounds" element={<Campgrounds />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
