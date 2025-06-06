import express from "express";
// import { supabase } from "../supabase-config-client";

const PORT = 3000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
