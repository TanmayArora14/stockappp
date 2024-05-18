const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Controller function to register a new user
exports.register = async (req, res) => {
  try {
    // Extract username and password from request body
    const { username, password } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with hashed password
    const user = new User({ username, password: hashedPassword });

    // Save the user to the database
    await user.save();

    // Send success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Send error response if any error occurs
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to authenticate and login a user
exports.login = async (req, res) => {
  try {
    // Extract username and password from request body
    const { username, password } = req.body;

    // Find user with the given username
    const user = await User.findOne({ username });

    // If user not found, send error response
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if password matches with hashed password stored in database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password is invalid, send error response
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token with user id as payload
    const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "1h" });

    // Send success response with JWT token
    res.status(200).json({ token });
  } catch (error) {
    // Send error response if any error occurs
    res.status(500).json({ error: "Internal server error" });
  }
};
