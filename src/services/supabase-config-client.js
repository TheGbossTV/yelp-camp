import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Only load .env file in development
if (process.env.NODE_ENV !== "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });
}

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseApiKey = process.env.VITE_SUPABASE_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseApiKey);
