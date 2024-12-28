const express = require('express');
const router = express.Router();
const DrugInteraction = require('../models/DrugInteraction'); // Adjust the path as necessary

// API endpoint to get drug interactions
router.get('/check', async (req, res) => {
    const { firstDrug, secondDrug } = req.query;

    try {
        const interaction = await DrugInteraction.findOne({
            $or: [
                { drug1: firstDrug, drug2: secondDrug },
                { drug1: secondDrug, drug2: firstDrug }
            ]
        });

        if (interaction) {
            res.json({ message: interaction.message });
        } else {
            res.json({ message: "No interaction found between these drugs." });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router; 