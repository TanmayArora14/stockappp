const Watchlist = require("../models/Watchlist");

// Controller function to get the watchlist of the authenticated user
exports.getWatchlist = async (req, res) => {
  try {
    // Find the watchlist associated with the user ID from the request
    const watchlist = await Watchlist.findOne({ userId: req.userId });

    // If watchlist not found, send error response
    if (!watchlist) {
      return res.status(404).json({ error: "Watchlist not found" });
    }

    // Send success response with the watchlist
    res.status(200).json({ watchlist });
  } catch (error) {
    // Send error response if any error occurs
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to add a symbol to the user's watchlist
exports.addToWatchlist = async (req, res) => {
  try {
    const { symbol } = req.body;

    // Find the watchlist associated with the user ID from the request
    let watchlist = await Watchlist.findOne({ userId: req.userId });

    // If watchlist not found, create a new one and add the symbol
    if (!watchlist) {
      watchlist = new Watchlist({ userId: req.userId, symbols: [symbol] });
    } else {
      // If watchlist exists, add the symbol to the existing list
      watchlist.symbols.push(symbol);
    }

    // Save the updated watchlist
    await watchlist.save();

    // Send success response
    res.status(201).json({ message: "Symbol added to watchlist" });
  } catch (error) {
    // Send error response if any error occurs
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to remove a symbol from the user's watchlist
exports.removeFromWatchlist = async (req, res) => {
  try {
    const { symbol } = req.params;

    // Find the watchlist associated with the user ID from the request
    const watchlist = await Watchlist.findOne({ userId: req.userId });

    // If watchlist not found, send error response
    if (!watchlist) {
      return res.status(404).json({ error: "Watchlist not found" });
    }

    // Remove the symbol from the watchlist
    watchlist.symbols = watchlist.symbols.filter((s) => s !== symbol);

    // Save the updated watchlist
    await watchlist.save();

    // Send success response
    res.status(200).json({ message: "Symbol removed from watchlist" });
  } catch (error) {
    // Send error response if any error occurs
    res.status(500).json({ error: "Internal server error" });
  }
};
