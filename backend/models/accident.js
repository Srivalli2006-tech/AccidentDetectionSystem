const mongoose = require('mongoose');

const AccidentSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true },
  location: { type: String, required: true },
  severity: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Accident', AccidentSchema);
