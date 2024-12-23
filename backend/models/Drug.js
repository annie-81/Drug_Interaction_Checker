const mongoose = require('mongoose');

// Define the Drug schema
const drugSchema = new mongoose.Schema({
  name: { type: String, required: true },
  interactions: { type: [String], default: [] },
});

// Export the Drug model
module.exports = mongoose.model('Drug', drugSchema);
