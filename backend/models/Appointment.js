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

// Last line of defence against double booking: two simultaneous requests can both pass
// the availability check in the route, but the database rejects the second insert.
appointmentSchema.index({ date: 1, time: 1 }, { unique: true });

export default mongoose.model("dates", appointmentSchema);
// export default mongoose.model("Appointment", appointmentSchema);
