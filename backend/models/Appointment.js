import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number },
  issue: { type: String },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("dates", appointmentSchema);
// export default mongoose.model("Appointment", appointmentSchema);
