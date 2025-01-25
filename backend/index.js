require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Interaction = require('./models/interaction');
const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

// API endpoint to check drug interactions
app.post('/check-interaction', async (req, res) => {
  try {
    const { drug_1, drug_2 } = req.body;
    console.log('Checking interaction between:', drug_1, 'and', drug_2);

    if (!drug_1 || !drug_2) {
      return res.status(400).json({
        error: 'Both drug names are required'
      });
    }

    // Query MongoDB for the interaction
    const interaction = await Interaction.findOne({
      $or: [
        { drug_1: drug_1.toLowerCase(), drug_2: drug_2.toLowerCase() },
        { drug_1: drug_2.toLowerCase(), drug_2: drug_1.toLowerCase() }
      ]
    });

    if (!interaction) {
      return res.status(404).json({
        error: 'No interaction found between these drugs'
      });
    }

    // Log the found interaction
    console.log('Found interaction:', interaction);

    res.json(interaction);
  } catch (error) {
    console.error('Error checking drug interaction:', error);
    res.status(500).json({
      error: 'Internal server error while checking drug interaction'
    });
  }
});

// API endpoint to get all drug interactions
app.get('/all-interactions', async (req, res) => {
  try {
    const interactions = await Interaction.find({});
    res.json(interactions);
  } catch (error) {
    console.error('Error fetching all interactions:', error);
    res.status(500).json({
      error: 'Internal server error while fetching interactions'
    });
  }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
