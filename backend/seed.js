const mongoose = require('mongoose');
const Accident = require('../models/Accident');

mongoose.connect('mongodb://127.0.0.1:27017/accidentDB')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const sampleData = [
    { latitude: 19.0760, longitude: 72.8777 },
    { latitude: 28.7041, longitude: 77.1025 },
    { latitude: 12.9716, longitude: 77.5946 }
];

Accident.insertMany(sampleData)
    .then(() => {
        console.log('Sample accident data added!');
        mongoose.connection.close();
    })
    .catch(err => console.log(err));
