const Bookmark = require('../models/Bookmark');
const stockCache = require('../models/stockCache');

async function check_bookmarks(req, res, next) {
    try {
        if(!req.user) {
            return res.status(401).json({
                error: "User not authenticated"
            })
        }

        const stock = await stockCache.findOne({ticker: req.query.ticker});
        if(!stock) {
            return res.status(200).json({bookmarked: false});
        }

        const bookmark = await Bookmark.findOne({
            user: req.user._id,
            stock: stock._id
        });
        
        if(bookmark) {
            return res.status(200).json({bookmarked: true});
        }
        
        return res.status(200).json({bookmarked: false});
    }
    catch(err) {
        console.log("Error checking bookmark: ");
        next(err);
    }
}

module.exports = check_bookmarks;