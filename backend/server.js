const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

// Change port to avoid conflicts
const PORT = process.env.PORT || 5001; // changed from 5000
const mongoURI = "mongodb://127.0.0.1:27017/accidentDB";

let db, accidentsCollection;

MongoClient.connect(mongoURI, { useUnifiedTopology: true })
  .then(client => {
    console.log("Connected to MongoDB");
    db = client.db("accidentDB");
    accidentsCollection = db.collection("accidents");
  })
  .catch(err => console.error(err));

// API: Get all accidents
app.get("/api/accidents", async (req, res) => {
  try {
    const accidents = await accidentsCollection.find({}).toArray();
    res.json(accidents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
