const express = require("express");
const router = express.Router();
const Accident = require("../models/accident");

// Get all accidents
router.get("/", async (req, res) => {
  try {
    const accidents = await Accident.find();
    res.json(accidents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
