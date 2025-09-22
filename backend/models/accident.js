const mongoose = require("mongoose");

const AccidentSchema = new mongoose.Schema({
  person: String,
  location: String,
  position: { type: [Number], required: true }, // [lat, lng]
  date: String,
  time: String,
  severity: String,
  description: String,
  contact: String,
});

module.exports = mongoose.model("Accident", AccidentSchema);
