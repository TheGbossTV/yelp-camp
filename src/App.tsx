import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Layout
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

// Pages
import HomePage from "./Pages/HomePage";
import Campgrounds from "./Pages/Campgrounds";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";

import type { Session } from "@supabase/supabase-js";

function App() {
  const [session, setSession] = useState<Session | null>(null);

  const checkSession = async () => {
    try {
      const response = await fetch("http://localhost:3000/session");
      const data = await response.json();
      console.log(data);
      // setSession(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <button onClick={checkSession}>Check Session</button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/campgrounds" element={<Campgrounds />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
