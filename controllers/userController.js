const User = require("../models/User"); // Replace with your User model import

// Controller function to get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    // Respond with the list of users
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller function to get user by ID
exports.getUserById = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
     user:user,
      status:true,
      message:'User fetch successfully'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
