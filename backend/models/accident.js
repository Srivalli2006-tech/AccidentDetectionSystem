const mongoose = require('mongoose');

const accidentSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Accident', accidentSchema);
