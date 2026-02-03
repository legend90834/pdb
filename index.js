const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/data", async (req, res) => {
  const result = await pool.query("SELECT * FROM notes");
  res.json(result.rows);
});

app.post("/data", async (req, res) => {
  const { text } = req.body;
  await pool.query("INSERT INTO notes(text) VALUES($1)", [text]);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server started"));
