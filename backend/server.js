const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const webAccidentRoutes = require('./routes/webAccident');
const mobileAccidentRoutes = require('./routes/mobileAccident');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/accidentDB')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/web', webAccidentRoutes);
app.use('/api/mobile', mobileAccidentRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
