require("dotenv").config({"path": "../.env" });
const axios = require("axios");

const FINNHUB_KEY = process.env.FINNHUB_KEY;


//using axios to fetch api
async function get_price(ticker) {
    try {
        const url = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${FINNHUB_KEY}`;
        const response = await axios.get(url);
        const stockData = response.data;
        return stockData.c; // Return the current price
    }
    catch(error) {
        if(error.response.status === 403) {
            throw new Error("403 Forbidden - Access to stock price data is restricted for non-US companies.");
        }
        else {
            throw new Error("Error fetching stock price. Please try again later.");
        }   
    }
}

module.exports = get_price;