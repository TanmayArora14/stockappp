// routes/stockRoutes.js
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    console.log(symbol);
    const apiKey = "S4BN4JOIHA68PKV5"; // Replace 'YOUR_API_KEY' with your actual API key from Alpha Vantage
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;
    const response = await axios.get(apiUrl);
    // console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stock information" });
  }
});

module.exports = router;
