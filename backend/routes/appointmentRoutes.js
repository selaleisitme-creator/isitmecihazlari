import express from "express";
import Appointment from "../models/Appointment.js";
import nodemailer from "nodemailer";

const router = express.Router();

const DAY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const SLOT_TAKEN_MESSAGE = "Bu saat az önce doldu. Lütfen başka bir saat seçin.";

// Calendar day in Turkey ("2026-11-24") regardless of the server's own time zone.
function turkeyDayKey(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Istanbul", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(date);
}

// Turkey has been on fixed UTC+3 since 2016, so local midnight is a fixed offset.
function turkeyMidnight(dayKey) {
  return new Date(`${dayKey}T00:00:00+03:00`);
}

// GET - taken times for one day; returns only times, never personal data
router.get("/booked", async (req, res) => {
  const day = String(req.query.date || "");
  if (!DAY_PATTERN.test(day)) {
    return res.status(400).json({ error: "Tarih YYYY-AA-GG biçiminde olmalı." });
  }
  try {
    const start = turkeyMidnight(day);
    const taken = await Appointment.find(
      { date: { $gte: start, $lt: new Date(start.getTime() + ONE_DAY_MS) } },
      { time: 1, _id: 0 }
    ).lean();
    res.json({ times: taken.map(a => a.time).sort() });
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

  // Store every booking as Turkey midnight of its day so equal days compare equal.
  const day = turkeyDayKey(requested);
  const date = turkeyMidnight(day);
  if (new Date(`${day}T${time}:00+03:00`) <= new Date()) {
    return res.status(400).json({ error: "Geçmiş bir saate randevu alınamaz." });
  }

  try {
    if (await Appointment.exists({ date, time })) {
      return res.status(409).json({ error: SLOT_TAKEN_MESSAGE });
    }

    const appointment = new Appointment({ ...req.body, date, time });
    await appointment.save();

    // Send email to company
    await sendEmailToCompany(appointment);

    res.status(201).json({ message: "Randevu başarıyla kaydedildi" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: SLOT_TAKEN_MESSAGE });
    }
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
      <p><strong>Ad Soyad:</strong> ${escapeHtml(appointment.name)}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(appointment.phone)}</p>
      <p><strong>E-posta:</strong> ${escapeHtml(appointment.email)}</p>
      <p><strong>Tarih:</strong> ${new Date(appointment.date).toLocaleDateString("tr-TR", { timeZone: "Europe/Istanbul" })}</p>
      <p><strong>Saat:</strong> ${escapeHtml(appointment.time)}</p>
      ${appointment.issue ? `<p><strong>İşitme Problemi:</strong> ${escapeHtml(appointment.issue)}</p>` : ""}
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(" E-posta gönderildi:", appointment.email);
}

export default router;
