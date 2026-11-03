import express from "express";
import nodemailer from "nodemailer";
import { getSupabase } from "../lib/supabase.js";

const router = express.Router();

const TABLE = "appointment_requests";
const DAY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;
const SLOT_TAKEN_MESSAGE = "Bu saat az önce doldu. Lütfen başka bir saat seçin.";
const UNIQUE_VIOLATION = "23505"; // PostgreSQL error code for a unique index conflict

// Calendar day in Turkey ("2026-11-24") regardless of the server's own time zone.
function turkeyDayKey(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Istanbul", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(date);
}

// GET - taken times for one day; returns only times, never personal data
router.get("/booked", async (req, res) => {
  const day = String(req.query.date || "");
  if (!DAY_PATTERN.test(day)) {
    return res.status(400).json({ error: "Tarih YYYY-AA-GG biçiminde olmalı." });
  }
  try {
    const { data, error } = await getSupabase()
      .from(TABLE)
      .select("appointment_time")
      .eq("appointment_date", day)
      .neq("status", "rejected"); // a rejected request frees its slot
    if (error) throw error;
    res.json({ times: data.map(row => row.appointment_time).sort() });
  } catch (error) {
    console.error("Dolu saatler okunamadı:", error);
    res.status(500).json({ error: "Dolu saatler okunamadı" });
  }
});

// POST - create appointment
router.post("/", async (req, res) => {
  // Honeypot: the form hides a "website" field from people. Bots fill every field, so a
  // value here means a bot. Reply with the normal success so it does not adapt.
  if (String(req.body.website || "").trim() !== "") {
    return res.status(201).json({ message: "Randevu başarıyla kaydedildi" });
  }

  const requested = new Date(req.body.date);
  const time = String(req.body.time || "");
  if (Number.isNaN(requested.getTime()) || !TIME_PATTERN.test(time)) {
    return res.status(400).json({ error: "Geçerli bir tarih ve saat seçin." });
  }

  const name = String(req.body.name || "").trim();
  const phone = String(req.body.phone || "").trim();
  const email = String(req.body.email || "").trim();
  if (!name || !phone || !email) {
    return res.status(400).json({ error: "Ad soyad, telefon ve e-posta zorunludur." });
  }

  // The form sends local midnight; store only the Turkey calendar day (a DATE column),
  // so the day can never shift with the server's time zone.
  const day = turkeyDayKey(requested);
  if (new Date(`${day}T${time}:00+03:00`) <= new Date()) {
    return res.status(400).json({ error: "Geçmiş bir saate randevu alınamaz." });
  }

  const age = Number.parseInt(req.body.age, 10);
  const appointment = {
    full_name: name,
    phone,
    email,
    age: Number.isNaN(age) ? null : age,
    issue: String(req.body.issue || "").trim() || null,
    appointment_date: day,
    appointment_time: time,
  };

  try {
    // The unique index on (appointment_date, appointment_time) rejects a taken slot,
    // even when two requests arrive at the same moment.
    const { error } = await getSupabase().from(TABLE).insert(appointment);
    if (error?.code === UNIQUE_VIOLATION) {
      return res.status(409).json({ error: SLOT_TAKEN_MESSAGE });
    }
    if (error) throw error;

    // Send email to company
    await sendEmailToCompany(appointment);

    res.status(201).json({ message: "Randevu başarıyla kaydedildi" });
  } catch (error) {
    console.error("Randevu oluşturma hatası:", error);
    res.status(500).json({ error: "Randevu kaydedilemedi" });
  }
});

// Form fields come from anyone on the internet. Without escaping, a visitor could
// type HTML (e.g. a fake "click here" link) and it would render inside the clinic's
// own notification email.
export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// function to send email
async function sendEmailToCompany(appointment) {
  // Replace with your company email credentials
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.COMPANY_EMAIL, // e.g. selaleisitme@gmail.com
      pass: process.env.EMAIL_PASSWORD, // App password
    },
  });

  const mailOptions = {
    from: `"Randevu Sistemi" <${process.env.COMPANY_EMAIL}>`,
    to: process.env.COMPANY_EMAIL,
    subject: "Yeni Randevu Talebi",
    html: `
      <h3>Yeni Randevu Talebi</h3>
      <p><strong>Ad Soyad:</strong> ${escapeHtml(appointment.full_name)}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(appointment.phone)}</p>
      <p><strong>E-posta:</strong> ${escapeHtml(appointment.email)}</p>
      <p><strong>Tarih:</strong> ${appointment.appointment_date.split("-").reverse().join(".")}</p>
      <p><strong>Saat:</strong> ${escapeHtml(appointment.appointment_time)}</p>
      ${appointment.issue ? `<p><strong>İşitme Problemi:</strong> ${escapeHtml(appointment.issue)}</p>` : ""}
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(" E-posta gönderildi:", appointment.email);
}

export default router;
