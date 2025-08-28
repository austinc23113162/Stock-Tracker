const mongoose = require('mongoose');

const stockCacheSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    ticker: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
}, {timestamps: true}
);

module.exports = mongoose.model("stockCache", stockCacheSchema);