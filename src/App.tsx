import { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Layout
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

// Pages
import HomePage from "./Pages/HomePage";
import CampgroundList from "./Pages/CampgroundPages/CampgroundList";
import NewCampground from "./Pages/CampgroundPages/NewCampground";
import RegisterPage from "./Pages/AuthenticationPages/RegisterPage";
import LoginPage from "./Pages/AuthenticationPages/LoginPage";
import MyCampgrounds from "./Pages/CampgroundPages/MyCampgrounds";
import CampgroundEdit from "./Pages/CampgroundPages/CampgroundEdit";

import type { Session } from "@supabase/supabase-js";
import ViewCampground from "./Pages/CampgroundPages/ViewCampground";

// Custom hook to handle scrolling to top on route change
function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Try multiple approaches to ensure scrolling works
    const scrollOptions = {
      top: 0,
      left: 0,
      behavior: "auto" as ScrollBehavior,
    };

    try {
      // First try the modern approach
      window.scroll(scrollOptions);
    } catch {
      // Fallback to older method
      window.scrollTo(0, 0);
    }

    // Also try scrollIntoView as another fallback
    try {
      document.documentElement.scrollTo(0, 0);
      document.body.scrollTo(0, 0);

      // Also try to scroll the main content div
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        mainContent.scrollTop = 0;
      }
    } catch {
      console.error("Error scrolling");
    }
  }, [pathname]);
}

function App() {
  // State to store session data from the server
  // These state variables are the source of truth for authentication state
  const [session, setSession] = useState<Session | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  // Use the custom hook to scroll to top on route change
  useScrollToTop();

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
    <>
      <div className="bg-green-300 h-screen absolute top-0 left-0 w-full z-[-2]" />
      <div
        className="flex flex-col h-screen overflow-y-auto"
        ref={mainRef}
        id="main-content"
      >
        <Navbar user={session?.user} logout={logout} />
        <Routes>
          <Route path="/" element={<HomePage user={session?.user} />} />
          <Route path="/campgrounds" element={<CampgroundList />} />
          <Route
            path="/campgrounds/add"
            element={<NewCampground user={session?.user} />}
          />
          <Route
            path="/campgrounds/my-campgrounds"
            element={<MyCampgrounds user={session?.user} />}
          />
          <Route
            path="/campgrounds/edit/:id"
            element={<CampgroundEdit user={session?.user} />}
          />
          <Route path="/campgrounds/:id" element={<ViewCampground />} />
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
    </>
  );
}

export default App;
