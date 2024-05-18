// routes/exampleRoutes.js

const express = require("express");
const router = express.Router();

/**
 * Route to greet the user with "Hello, World!"
 * @name GET /api/reg
 * @function
 * @memberof module:routes/exampleRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {String} - "Hello, World!" message
 */
router.get("/reg", (req, res) => {
  res.send("Hello, World!");
});

module.exports = router;
