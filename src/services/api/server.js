import express from "express";
// import { supabase } from "../supabase-config-client";

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
