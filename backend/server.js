import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
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

// MongoDB connection
// Vercel reuses a warm instance across requests. Mongoose never retries a failed first
// connect, so one network hiccup at startup used to break every later request.
// Each request now checks the connection and reconnects when it is down.
let connecting = null;
mongoose.connection.on("disconnected", () => { connecting = null; });

function connectToDatabase() {
  if (mongoose.connection.readyState === 1) return Promise.resolve();
  if (!connecting) {
    connecting = mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 8000 })
      .then(() => console.log("MongoDB bağlantısı başarılı"))
      .catch(err => {
        connecting = null;
        console.error("❌ MongoDB bağlantı hatası:", err);
        throw err;
      });
  }
  return connecting;
}

connectToDatabase().catch(() => {});

async function requireDatabase(req, res, next) {
  try {
    await connectToDatabase();
    next();
  } catch {
    res.status(503).json({ error: "Veritabanına şu an ulaşılamıyor. Lütfen biraz sonra tekrar deneyin." });
  }
}

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

// Limiters run before the database check so blocked requests never touch MongoDB.
app.post("/api/appointments", bookingLimiter);
app.get("/api/appointments/booked", bookedSlotsLimiter);
app.use("/api/appointments", requireDatabase, appointmentRoutes);

app.get("/", (req, res) => {
  res.send("İşitme Cihazları API çalışıyor...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});