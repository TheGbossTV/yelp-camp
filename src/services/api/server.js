import express from "express";
import cors from "cors";
import { supabase } from "../supabase-config-client.js";

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({
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
    res.send({ message: "Register successful" });
  }
});
