// services/alphaVantageService.js
const axios = require("axios");

exports.getStockInfo = async (symbol) => {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching stock information");
  }
};
