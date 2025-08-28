require("dotenv").config({"path": "../.env" });
const axios = require("axios");

const FINNHUB_KEY = process.env.FINNHUB_KEY;

//using axios to fetch api
async function get_news(ticker) {
    try {
        //change the date to be current date later
        const url = `https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=2025-08-12&to=2025-08-13&token=${FINNHUB_KEY}`;
        const response = await axios.get(url);

        const news = []
        let count = 0;
        for(i = 0; i < response.data.length; i++) {
            if(count < 3) {
                news.push(response.data[i]);
            }
            else {
                break;
            }
            count++;
        }
        return news;
    }
    catch(error) {
        if(error.response.status === 403) {
            throw new Error("403 Forbidden - Access to stock data is restricted for non-US companies.");
        }
        else {
            throw new Error("Error fetching company news. Please try again later.");
        }
    }
}

module.exports = get_news;