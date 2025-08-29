import express from "express";
import cors from "cors";
import mysql from "mysql2";
import { nanoid } from "nanoid";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // your MySQL username
  password: "12345",  // your MySQL password
  database: "location_tracker",
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

// ✅ Save location into MySQL
app.post("/api/save-location", (req, res) => {
  const { lat, lng } = req.body;
  if (!lat || !lng) return res.status(400).json({ error: "Invalid location" });

  const id = nanoid(8);
  const sql = "INSERT INTO locations (id, lat, lng) VALUES (?, ?, ?)";
  db.query(sql, [id, lat, lng], (err) => {
    if (err) return res.status(500).json({ error: "DB insert failed" });
    res.json({ link: `http://localhost:5173/share/${id}` });
  });
});

// ✅ Fetch location from MySQL
app.get("/api/location/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT lat, lng FROM locations WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "DB query failed" });
    if (result.length === 0) return res.status(404).json({ error: "Location not found" });
    res.json(result[0]);
  });
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
