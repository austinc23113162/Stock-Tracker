const stockCache = require('../models/stockCache');

async function store_cache(req, res, next) {
    try {
        const {name, ticker, price} = req.body;

        let stock = await stockCache.findOne({ticker})
        if(!stock) {
            stock = new stockCache({name, ticker, price});
            await stock.save();
        }
        req.cachedStock = stock;
        next();
    }
    catch(err) {
        console.log("Error storing stock cache: ");
        next(err);
    }
}

module.exports = store_cache;