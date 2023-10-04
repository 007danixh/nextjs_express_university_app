const express = require('express');
const router = express.Router();
const SearchHistory = require('../models/searchHistory');

// Route to store a search term
// Route to store a search term
router.post('/store-search', async (req, res) => {
    try {
        const { term } = req.body;

        // Check if the term already exists in the database
        const existingTerm = await SearchHistory.findOne({ term: { $regex: new RegExp(term, 'i') } });

        if (existingTerm) {
            return res.status(200).json({ message: 'Search term already exists' });
        }

        const search = new SearchHistory({ term });
        await search.save();
        res.status(200).json({ message: 'Search term stored successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while storing the search term' });
    }
});

// Route to fetch search suggestions
router.get('/get-suggestions', async (req, res) => {
    try {
        const suggestions = await SearchHistory.find()
            .sort({ timestamp: -1 })
            .limit(100)
            .distinct('term');
        res.status(200).json(suggestions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching suggestions' });
    }
});

module.exports = router;
