const express = require("express");
const router = express.Router();
const Accident = require("../models/accident");

// Add a new accident
router.post("/", async (req, res) => {
  const { vehicleNumber, location, severity } = req.body;

  const accident = new Accident({
    vehicleNumber,
    location,
    severity
  });

  try {
    const newAccident = await accident.save();
    res.status(201).json(newAccident);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
