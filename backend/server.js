import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import appointmentRoutes from "./routes/appointmentRoutes.js";

dotenv.config();

const app = express();

// CORS()
app.use(cors({
  origin: "http://localhost:5173",
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