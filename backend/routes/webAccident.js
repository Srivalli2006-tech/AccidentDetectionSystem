const express = require('express');
const router = express.Router();
const Accident = require('./models/Accident');

// Get all accidents for Web
router.get('/accidents', async (req, res) => {
    try {
        const accidents = await Accident.find().sort({ timestamp: -1 });
        res.json(accidents);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
