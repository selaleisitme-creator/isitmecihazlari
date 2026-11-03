import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import appointmentRoutes from "./routes/appointmentRoutes.js";

dotenv.config();

const app = express();

// Vercel forwards requests through its own proxy. Without this, every visitor would
// appear to come from Vercel's address and share one rate-limit counter.
app.set("trust proxy", 1);

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

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connection successful 🎉" });
});

// Each booking stores a record and sends an email, so a script hammering this endpoint
// could exhaust Gmail's daily quota and fill every free slot. Limits are per visitor IP.
// Note: on Vercel each warm instance keeps its own counter, so the cap is approximate.
const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Çok fazla deneme yapıldı. Lütfen 15 dakika sonra tekrar deneyin." },
});
const bookedSlotsLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Çok fazla istek yapıldı. Lütfen biraz sonra tekrar deneyin." },
});

// Limiters run before the routes so blocked requests never reach the database.
app.post("/api/appointments", bookingLimiter);
app.get("/api/appointments/booked", bookedSlotsLimiter);
app.use("/api/appointments", appointmentRoutes);

app.get("/", (req, res) => {
  res.send("İşitme Cihazları API çalışıyor...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});