// authRoutes.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * Route to handle user registration
 * @name POST /api/auth/register
 * @function
 * @memberof module:routes/authRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {JSON} - JSON response indicating success or failure
 */
router.post("/register", authController.register);

/**
 * Route to handle user login
 * @name POST /api/auth/login
 * @function
 * @memberof module:routes/authRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {JSON} - JSON response containing a JWT token or error message
 */
router.post("/login", authController.login);

module.exports = router;
