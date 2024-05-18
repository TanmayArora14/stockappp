const mongoose = require("mongoose");

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  // Define the username field with type string, required, and unique constraints
  username: { type: String, required: true, unique: true },
  // Define the password field with type string and required constraint
  password: { type: String, required: true },
});

// Create the User model based on the userSchema
const User = mongoose.model("User", userSchema);

// Export the User model for use in other files
module.exports = User;
