const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
    term: String,
    // timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SearchHistory', searchHistorySchema);
