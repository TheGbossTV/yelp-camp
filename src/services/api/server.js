import express from "express";
import cors from "cors";
import session from "express-session"; // Import express-session middleware for server-side session management
import { supabaseServer } from "../supabase-config-server.js";
import { v4 as uuidv4 } from "uuid";

const PORT = 3000;

const app = express();
app.use(express.json());
// Configure CORS to allow credentials (cookies) to be sent cross-origin
// This is required for session cookies to work with the frontend
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Allow cookies to be sent from frontend to backend
  })
);

/**
 * Express Session Configuration
 *
 * This middleware creates a session for each user visiting the site.
 * It stores session data on the server and gives the client a cookie with a session ID.
 *
 * - secret: Used to sign the session cookie to prevent tampering
 * - resave: Don't save session if unmodified
 * - saveUninitialized: Don't create session until something is stored
 * - cookie: Configuration for the session cookie
 *   - secure: Only use HTTPS in production
 *   - httpOnly: Prevents client-side JS from reading the cookie
 *   - maxAge: Cookie expiration time (24 hours)
 */
app.use(
  session({
    secret: "your-secret-key", // Change this to a real secret key in production
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// POST REQUESTS
/**
 * Login endpoint
 *
 * 1. Attempts to authenticate with Supabase using email/password
 * 2. If successful, stores user data and tokens in the Express session
 * 3. The session is now tied to this user across requests
 */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabaseServer.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    res.status(400).send({ message: error.message });
  } else {
    // Store Supabase authentication data in the Express session
    // This allows the server to remember who is logged in between requests
    req.session.user = data.user;
    req.session.access_token = data.session.access_token;
    req.session.refresh_token = data.session.refresh_token;
    res.send({ message: "Login successful", user: data.user });
  }
});

/**
 * Registration endpoint
 *
 * 1. Registers a new user with Supabase
 * 2. If auto-confirmation is enabled, also stores session data
 */
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const { data, error } = await supabaseServer.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (error) {
    res.status(400).send({ message: error.message });
  } else {
    // Store session data if auto-confirmed (depends on your Supabase settings)
    // If email confirmation is required, there won't be a session yet
    if (data.session) {
      req.session.user = data.user;
      req.session.access_token = data.session.access_token;
      req.session.refresh_token = data.session.refresh_token;
    }
    res.send({ message: "Register successful", user: data.user });
  }
});

/**
 * Logout endpoint
 *
 * 1. Signs out the user from Supabase
 * 2. Destroys the Express session
 * 3. Client will no longer be authenticated
 */
app.post("/logout", async (req, res) => {
  const { error } = await supabaseServer.auth.signOut();

  if (error) {
    res.status(400).send({ message: error.message });
  } else {
    // Destroy the express session, removing all session data
    req.session.destroy((err) => {
      if (err) {
        res.status(500).send({ message: "Failed to logout" });
      } else {
        res.send({ message: "Logout successful" });
      }
    });
  }
});

app.post("/campground", async (req, res) => {
  // Check if user is authenticated
  if (!req.session.user) {
    return res
      .status(401)
      .send({ message: "You must be logged in to create a campground" });
  }

  const { name, price, description } = req.body;
  try {
    const { data, error } = await supabaseServer
      .from("Posts")
      .insert({
        id: uuidv4(),
        created_at: new Date().toISOString(),
        title: name,
        created_by: req.session.user.id,
        price: price,
        description: description,
        email: req.session.user.email,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(400).send({ message: error.message });
    }

    res.send({ message: "Campground created", data });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).send({ message: "Failed to create campground" });
  }
});
// GET REQUESTS
/**
 * Session check endpoint
 *
 * This endpoint is used to:
 * 1. Check if the user has an active session
 * 2. Return session data to the client
 *
 * Two-tier session check:
 * - First checks the Express session (faster, already server-side)
 * - If not found, checks with Supabase as a fallback
 */
app.get("/session", async (req, res) => {
  // First, check if the user is already authenticated in the Express session
  // This is faster than going to Supabase for every request
  if (req.session.user) {
    return res.send({
      session: {
        user: req.session.user,
        access_token: req.session.access_token,
      },
    });
  }

  // If not in express session, try to get from Supabase
  // This covers cases where the session might exist in Supabase but not in Express
  const { data, error } = await supabaseServer.auth.getSession();
  if (error) {
    res.status(400).send({ message: error.message });
  } else if (data?.session) {
    // If found in Supabase, store in express session for future requests
    // This synchronizes the Express session with Supabase
    req.session.user = data.session.user;
    req.session.access_token = data.session.access_token;
    req.session.refresh_token = data.session.refresh_token;
    res.send(data);
  } else {
    // No session found in either Express or Supabase
    res.send({ session: null });
  }
});
