require("dotenv").config({"path": "../.env" });
const axios = require("axios");

const FINNHUB_KEY = process.env.FINNHUB_KEY;

//using axios to fetch api
async function get_company(name) {
    try {
        const url = `https://finnhub.io/api/v1/search?q=${name}&token=${FINNHUB_KEY}`;
        const response = await axios.get(url);
        const compInfo = response.data;
        if(compInfo.count > 0) {
            return compInfo.result[0]; // Return the first company found
        }
        else {
            return null;
        }
    }
    catch(err) {
        console.error("Error fetching company info:", err);
        // throw error to pass the error to process_form.js
        throw err;
    }
}

//get_company("amzn");
module.exports = get_company;