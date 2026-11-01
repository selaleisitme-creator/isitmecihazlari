import express from "express";
import Appointment from "../models/Appointment.js";
import nodemailer from "nodemailer";

const router = express.Router();

// POST - create appointment
router.post("/", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();

    // Send email to company
    await sendEmailToCompany(appointment);

    res.status(201).json({ message: "Randevu başarıyla kaydedildi" });
  } catch (error) {
    console.error("Randevu oluşturma hatası:", error);
    res.status(500).json({ error: "Randevu kaydedilemedi" });
  }
});

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
      <p><strong>Ad Soyad:</strong> ${appointment.name}</p>
      <p><strong>Telefon:</strong> ${appointment.phone}</p>
      <p><strong>E-posta:</strong> ${appointment.email}</p>
      <p><strong>Tarih:</strong> ${new Date(appointment.date).toLocaleDateString("tr-TR")}</p>
      <p><strong>Saat:</strong> ${appointment.time}</p>
      ${appointment.issue ? `<p><strong>İşitme Problemi:</strong> ${appointment.issue}</p>` : ""}
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(" E-posta gönderildi:", appointment.email);
}

export default router;
