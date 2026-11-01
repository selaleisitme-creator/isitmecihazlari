import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import appointmentRoutes from "./routes/appointmentRoutes.js";

dotenv.config();

const app = express();

// CORS()
// The site is served from several addresses (custom domain, www, Vercel URL), so `url`
// holds a comma-separated list. Trailing slashes are stripped because browsers send
// the Origin header without one and an exact match would otherwise fail.
const allowedOrigins = (process.env.url || "http://localhost:5173")
  .split(",")
  .map(origin => origin.trim().replace(/\/+$/, ""))
  .filter(Boolean);
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch(err => console.error("❌ MongoDB bağlantı hatası:", err));

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connection successful 🎉" });
});

app.use("/api/appointments", appointmentRoutes);

app.get("/", (req, res) => {
  res.send("İşitme Cihazları API çalışıyor...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});