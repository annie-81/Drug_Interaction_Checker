const mongoose = require('mongoose');

// Define a Schema
const interactionSchema = new mongoose.Schema({
  drug_1: { type: String, required: true },
  drug_2: { type: String, required: true },
  interaction: { type: String, required: true },
  severity: { type: String, enum: ['Low', 'Moderate', 'High'], required: true },
  mechanism: { type: String },
  recommendations: { type: String },
  dateAdded: { type: Date, default: Date.now }
});

// Create a compound index for drug pairs
interactionSchema.index({ drug_1: 1, drug_2: 1 }, { unique: true });

// Export the Model
const Interaction = mongoose.model('Interaction', interactionSchema);
module.exports = Interaction;
