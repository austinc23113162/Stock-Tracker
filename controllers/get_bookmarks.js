const Bookmark = require('../models/Bookmark');

async function get_bookmarks(req, res, next) {
    try {
        if(!req.user) {
            return res.status(401).json({
                error: "User not authenticated"
            })
        }

        //query and sort bookmarks by alphabetical order
        const sortBy = `stock.${req.query.sort}`
        let bookmarks = await Bookmark.aggregate([
            { $match: {user: req.user._id} }, //like find
            //like a join in SQL
            {
                $lookup: {
                    from: "stockcaches", //collection name
                    localField: "stock",
                    foreignField: "_id",
                    as: "stock"
                }
            },
            { $unwind: "$stock"}, //lookup add the joined collection as an array, unwind unwraps it out of the array
            { $sort: {[sortBy]: 1} }
        ]);
        
        bookmarks = bookmarks.map(b => b.stock);

        return res.status(200).json({bookmarks});
    }
    catch(err) {
        console.log("Error getting bookmark: ");
        next(err);
    }
}

module.exports = get_bookmarks;