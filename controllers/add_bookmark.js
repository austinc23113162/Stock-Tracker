const Bookmark = require('../models/Bookmark');

async function add_bookmark(req, res, next) {
    try {
        if(!req.user) {
            return res.status(401).json({
                error: "User not authenticated"
            })
        }

        if(!req.cachedStock) {
            return req.status(400).json({
                error: "Stock not cached"
            })
        }

        let bookmark = await Bookmark.findOne({
            user: req.user._id,
            stock: req.cachedStock._id
        });
        
        if(bookmark) {
            await Bookmark.deleteOne({_id: bookmark._id})
            return res.status(200).json({
                bookmarked: true,
                message: "Bookmark removed"
            });
        }
        else {
            bookmark =  new Bookmark({
                user: req.user._id, 
                stock: req.cachedStock._id
            });

            await bookmark.save();
            return res.status(201).json({
                bookmarked: false,
                message: "Bookmark added"
            });
        }
    }
    catch(err) {
        console.log("Error storing bookmark: ");
        next(err);
    }
}

module.exports = add_bookmark;