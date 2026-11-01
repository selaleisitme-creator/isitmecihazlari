import { sendMail } from '../utils/emailService.js';

export const createAppointment = async (req, res) => {
  const { name, email, date } = req.body;

  try {
    // your logic for saving appointment

    await sendMail(
      email,
      'Randevu Onayı',
      `Merhaba ${name}, ${date} tarihli randevunuz başarıyla oluşturulmuştur.`
    );

    res.status(200).json({ message: "Randevu oluşturuldu ve e-posta gönderildi." });
  } catch (err) {
    console.error("❌ Randevu oluşturma hatası:", err);
    res.status(500).json({ error: "Randevu oluşturulamadı." });
  }
};
