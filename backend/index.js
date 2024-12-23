const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Interaction = require('./models/interaction');
const app = express();

// Enable CORS for all routes
app.use(cors());

// Body parser middleware
app.use(express.json());

// MongoDB connection with proper options
mongoose.connect('mongodb://127.0.0.1:27017/drug_interactions', {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('Successfully connected to MongoDB.');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Middleware to log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// POST endpoint for drug interactions
app.post('/analyze', async (req, res) => {
  try {
    const { drug_name } = req.body;
    console.log('Analyzing drug:', drug_name);

    if (!drug_name) {
      return res.status(400).json({
        success: false,
        error: 'Drug name is required'
      });
    }

    // Query the database
    const interactions = await Interaction.find({
      $or: [
        { drugName: { $regex: new RegExp(drug_name, 'i') } },
        { interactionDetails: { $regex: new RegExp(drug_name, 'i') } }
      ]
    });

    console.log(`Found ${interactions.length} interactions for ${drug_name}`);

    // Send response
    res.json({
      success: true,
      drug: drug_name,
      count: interactions.length,
      interactions: interactions,
      message: interactions.length > 0 
        ? `Found ${interactions.length} interactions` 
        : 'No interactions found'
    });

  } catch (error) {
    console.error('Error in /analyze endpoint:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
});

// POST Route to Add Data
app.post('/api/interactions', async (req, res) => {
  try {
    const { drugName, interactionDetails, severity } = req.body;

    // Create a new interaction document
    const newInteraction = new Interaction({
      drugName,
      interactionDetails,
      severity,
    });

    // Save to MongoDB
    const savedInteraction = await newInteraction.save();
    res.status(201).json({ message: 'Data added successfully', data: savedInteraction });
  } catch (err) {
    res.status(500).json({ message: 'Error saving data', error: err.message });
  }
});

// Endpoint to add test data
app.post('/add-interaction', async (req, res) => {
  try {
    const { drug_1, drug_2, interaction, severity } = req.body;
    
    // Capitalize first letter of each drug name
    const formattedDrug1 = drug_1.charAt(0).toUpperCase() + drug_1.slice(1);
    const formattedDrug2 = drug_2.charAt(0).toUpperCase() + drug_2.slice(1);
    
    // Create new interaction
    const newInteraction = new Interaction({
      drug_1: formattedDrug1,
      drug_2: formattedDrug2,
      interaction,
      severity
    });

    // Save to database
    await newInteraction.save();
    
    res.json({
      success: true,
      message: 'Interaction added successfully',
      data: newInteraction
    });
  } catch (error) {
    console.error('Error adding interaction:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to add interaction',
      details: error.message
    });
  }
});

// POST endpoint for checking drug interactions between two drugs
app.post('/check-interaction', async (req, res) => {
  try {
    const { drug_1, drug_2 } = req.body;
    console.log('Checking interaction between:', drug_1, 'and', drug_2);

    if (!drug_1 || !drug_2) {
      return res.status(400).json({
        error: 'Both drug names are required'
      });
    }

    // Convert drug names to lowercase for case-insensitive search
    const drug1Lower = drug_1.toLowerCase();
    const drug2Lower = drug_2.toLowerCase();

    // Query the database for interaction between the two drugs
    const interaction = await Interaction.findOne({
      $or: [
        { drug_1: drug1Lower, drug_2: drug2Lower },
        { drug_1: drug2Lower, drug_2: drug1Lower }
      ]
    });

    if (!interaction) {
      return res.status(404).json({
        error: 'No interaction found between these drugs'
      });
    }

    // Capitalize the drug names in the response
    const response = {
      ...interaction.toObject(),
      drug_1: interaction.drug_1.charAt(0).toUpperCase() + interaction.drug_1.slice(1),
      drug_2: interaction.drug_2.charAt(0).toUpperCase() + interaction.drug_2.slice(1)
    };

    res.json(response);
  } catch (error) {
    console.error('Error checking drug interaction:', error);
    res.status(500).json({
      error: 'Internal server error while checking drug interaction'
    });
  }
});

// GET endpoint to view all interactions
app.get('/interactions', async (req, res) => {
  try {
    const interactions = await Interaction.find({});
    res.json(interactions);
  } catch (error) {
    console.error('Error fetching interactions:', error);
    res.status(500).json({ error: 'Failed to fetch interactions' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!',
    details: err.message
  });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
