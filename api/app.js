const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS middleware
const searchRoutes = require('./routes/search'); // Import your search routes

// Create an Express app
const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/universities-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Use the search routes defined in search.js
app.use('/api', searchRoutes); // Mount the search routes under '/api'

// Start the Express server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
