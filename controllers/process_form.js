const get_price = require("../API/get_price");
const get_company = require("../API/get_company");
const get_news = require("../API/get_news");

async function process_form(req, res, next) {
    try{
        const input = req.query.input; // Get the input from the query parameters
        const compInfo = await get_company(input);

        if(!compInfo) {
            console.log("No company found with that name. Please enter a more specific name or provide a ticker symbol.");
            res.status(404).json({error: "No company found with that name. Please enter a more specific name or provide a ticker symbol."});
            return;
        }
        
        let price = "Unavailable";
        let news = [];
        let error = null;
        try {
            price = await get_price(compInfo.symbol);
            news = await get_news(compInfo.symbol);
        }
        catch(err) {
            console.error(`We currently only support accessing companies listed in the US stock market. Apologies for any incovenience.\n${err.message}`);
            error = "We currently only support accessing company data listed in the US stock market. Apologies for any incovenience.";
            // If the price is unavailable, we still want to return the company info
            // so we set price to "Unavailable" and include an error message.
        }

        res.json({
            name : compInfo.description,
            ticker : compInfo.symbol,
            price,
            news,
            ... (error && {error}) // Include message only if it exists
        });

    }
    catch(err) {
        if(err.status == 429) {
            return res.status(429).json({
                error: "We are currently receiving too many requests. Please try again later."
            });
        }
        next(err);
    }
}

//export a function
module.exports = process_form;