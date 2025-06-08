import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Layout
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

// Pages
import HomePage from "./Pages/HomePage";
import CampgroundList from "./Pages/CampgroundPages/CampgroundList";
import NewCampground from "./Pages/CampgroundPages/NewCampground";
import RegisterPage from "./Pages/AuthenticationPages/RegisterPage";
import LoginPage from "./Pages/AuthenticationPages/LoginPage";

import type { Session } from "@supabase/supabase-js";

function App() {
  // State to store session data from the server
  // These state variables are the source of truth for authentication state
  const [session, setSession] = useState<Session | null>(null);

  /**
   * Fetches session data from the server
   *
   * This function:
   * 1. Makes a request to the /session endpoint with credentials included
   * 2. Updates local state with session data if authenticated
   * 3. Clears local state if not authenticated
   *
   * The 'credentials: include' option is critical for sending the session cookie
   * with the request, allowing the server to identify the user.
   */
  const checkSession = async () => {
    try {
      const response = await fetch("http://localhost:3000/session", {
        method: "GET",
        credentials: "include", // Critical: sends cookies with the request
      });
      const data = await response.json();

      if (data.session) {
        // User is authenticated - update state
        setSession(data.session);
      } else {
        // User is not authenticated - clear state
        setSession(null);
      }
    } catch (error) {
      console.error("Session check error:", error);
      setSession(null);
    }
  };

  /**
   * Logs out the user
   *
   * This function:
   * 1. Sends a request to the /logout endpoint
   * 2. The server will sign out from Supabase and destroy the session
   * 3. Updates local state to reflect logged out status
   *
   * Again, 'credentials: include' is required to send the session cookie
   * so the server knows which session to destroy.
   */
  const logout = async () => {
    try {
      await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include", // Critical: sends cookies with the request
      }).then((res) => {
        res.json();
        // Clear local authentication state
        setSession(null);
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Check session on component mount
  // This ensures authentication state is restored on page refresh
  useEffect(() => {
    checkSession();
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <Navbar user={session?.user} logout={logout} />
      <Routes>
        <Route path="/" element={<HomePage user={session?.user} />} />
        <Route path="/campgrounds" element={<CampgroundList />} />
        <Route path="/campgrounds/add" element={<NewCampground />} />
        <Route
          path="/login"
          element={<LoginPage checkSession={checkSession} />}
        />
        <Route
          path="/register"
          element={<RegisterPage checkSession={checkSession} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
