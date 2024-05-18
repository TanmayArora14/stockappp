// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const homeRoutes = require("./routes/homeRoutes");
const stockRoutes = require("./routes/stockRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose.connect(
  "mongodb+srv://arorakibndi:tanmaykibndi@cluster0.o93xdv7.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  },
  { debug: true }
);
console.log("mongo connected");
// Routes
// app.get("/api/watchlist", (req, res) => {
//   res.send("Hello, World!");
// });
app.use("/api", homeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/stock", stockRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
