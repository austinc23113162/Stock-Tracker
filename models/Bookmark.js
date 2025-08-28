const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    //reference to the User model
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    stock: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stockCache"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// compound index on {user, stock}. Mongo treats the combination of those 2 as 
// a key
// this ensure uniqueness for a user and data pair. So, a user can only bookmark a stock once.
bookmarkSchema.index({user: 1, stock: 1}, {unique: true});

module.exports = mongoose.model("Bookmark", bookmarkSchema);